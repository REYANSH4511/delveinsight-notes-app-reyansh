const mongoose = require("mongoose");
exports.dbConnection = async () => {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/notes");
    console.log("Database is connected", db.connection.name);
  } catch (err) {
    console.log(err);
  }
};
