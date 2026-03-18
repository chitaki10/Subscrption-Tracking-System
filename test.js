import mongoose from "mongoose";

const uri = "YOUR_DB_URI";

mongoose.connect(uri)
.then(() => {
  console.log("MongoDB connected");
  process.exit();
})
.catch(err => {
  console.error(err);
});