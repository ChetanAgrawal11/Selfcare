const express = require("express");
const app = express();
const connect = require("./db");

connect();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = 5000;
app.use("/api/auth", require("./routes/user"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
