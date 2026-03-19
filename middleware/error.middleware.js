const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Handle Mongoose bad ObjectId (e.g. /subscriptions/invalid-id)
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.statusCode = 404;
    }

    // Handle Mongoose duplicate key error (e.g. duplicate email)
    if (err.code === 11000) {
      const message = `Duplicate field value: ${Object.keys(err.keyValue).join(", ")}`;
      error = new Error(message);
      error.statusCode = 400;
    }

    // Handle Mongoose validation errors (e.g. required field missing)
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;