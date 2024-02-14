const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../modules/user");
const jwt_secret = "helelotehrseshash";
const fetchUser = require("../middleware/fetchUser");
router.post(
  "/createUser",
  [
    body("name", "Wrong username").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ error: result.array() });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send("User already exist");
    }
    user = await User.create({
      name: req.body.name,
      password: hash,
      email: req.body.email,
    });
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, jwt_secret);
    res.send({ token });
  }
);
router.post(
  "/login",
  [body("password").isLength({ min: 5 }), body("email").isEmail()],
  async (req, res) => {
    var success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ success, error: result.array() });
    }

    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ success, mess: "User Not exist " });
    }
    bcrypt.compareSync(req.body.password, jwt_secret); // true
    if (!bcrypt) {
      return res.send({ success, mess: "Password is wrong" });
    }
    success = true;
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, jwt_secret);
    res.send({ success, token });
  }
);
router.get("/getUser", fetchUser, async (req, res) => {
  const user_id = req.user.id;
  const user = await User.findById(user_id).select("-password");
  res.send(user);
});
module.exports = router;
