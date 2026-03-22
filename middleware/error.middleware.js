const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // 🔹 Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    message = `Resource not found. Invalid field: ${err.path}`;
    statusCode = 404;
  }

  // 🔹 Duplicate key error (MongoDB)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {}).join(', ');
    message = `${fields} already exists`;
    statusCode = 409;
  }

  // 🔹 Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    statusCode = 400;
  }

  // 🔹 JWT Errors (VERY IMPORTANT for auth)
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired';
    statusCode = 401;
  }

  // 🔹 Final response
  res.status(statusCode).json({
    success: false,
    message,
    // Optional (only in development)
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorMiddleware;