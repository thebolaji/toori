const mongoose = require("mongoose");

// Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected...............");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
