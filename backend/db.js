const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/SelfCare";
const connect = async () => {
  await mongoose.connect(url);
};
module.exports = connect;
