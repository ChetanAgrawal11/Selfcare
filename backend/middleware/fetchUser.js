const jwt_token = require("jsonwebtoken");
const jwt_secret = "helelotehrseshash";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("Invalid auth token");
  }
  const data = jwt_token.verify(token, jwt_secret);
  req.user = data.user;
  next();
};

module.exports = fetchUser;
