const env = process.env.NODE_ENV || "development",
  config = require("./config")[env],
  mongoose = require("mongoose");

module.exports = () => {
  const db = mongoose.connect(config.db, { useNewUrlParser: true });
  mongoose.connection
    .on("error", err => {
      console.log(
        "Error: Could not connect to MongoDB. Did you forget to run `mongod`?"
      );
    })
    .on("open", () => {
      console.log("Connection extablised with MongoDB");
    });
  return db;
};
