//import mongoose from 'mongoose';
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://imharsh:golumolu@cluster0.6tk58.mongodb.net/gst?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
