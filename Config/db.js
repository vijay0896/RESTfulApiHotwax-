const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL), console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection failed", error);
    process.exit(0);
  }
};

module.exports = connectDb;
