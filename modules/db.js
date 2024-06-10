const mongoose = require("mongoose");
const config = require("config");

let state = {
  db: null,
};

module.exports.connection = async () => {
  if (state.db) return;
  try {
    let url;
    url =
      "mongodb://" +
      config.get("db.host") +
      ":" +
      config.get("db.port") +
      "/" +
      config.get("db.name");

    let db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    state.db = db;
    console.log(" Database connection has been established successfully.");
    return db;
  } catch (err) {
    console.log("Unable to connect to the db:", err);
    return null;
  }
};

module.exports.close = (done) => {
  if (state.db) {
    state.db.connection.close(function (err) {
      state.db = null;
      if (done) {
        done(err);
      }
      console.log("Database connection has been successfully closed.", err);
    });
  }
};

module.exports.get = () => {
  return state.db;
};
