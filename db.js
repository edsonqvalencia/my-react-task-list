const mongoose = require("mongoose");

mongoose.set("debug", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "listaTareas",
    });
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
