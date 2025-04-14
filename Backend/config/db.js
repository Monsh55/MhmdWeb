const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://mhmd:012109@cluster0.z89yuvv.mongodb.net/"
    );
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Mongo Connection Error:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
