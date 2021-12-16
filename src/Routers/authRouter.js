const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User} = require("../DB/Models/users");
const Auth = require("../Auth/auth");
const config = require("../config");

// Router Export
const router = express.Router();

// Register
router.post("/register", (req, res, next) => {
  const { username, email, password, access_type, isActive } = req.body;

  const user = new User({
    username,
    email,
    password,
    access_type,
    isActive,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      //Hast password
      user.password = hash;
      //Save user
      try {
        const newUser = await user.save();
        res.send(newUser);
        res.end();
        next();
      } catch (err) {
        return next(err.message);
      }
    });
  });
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;  
    const user = await Auth.authenticate(username, password);
    // JWT Token
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: "1h",
      subject: user.id,
    });
    const { iat, exp, sub } = jwt.decode(token);
    // API RESPONSE JWT
    res.send({ iat, exp, sub, token });
    res.end();
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Refresh Token
router.post("/refresh", async (req, res, next) => {  
  try {
    const { tokenWeb, user } = req.body;
    const userObj = await User.findOne({ _id: user });

    const oldToken = jwt.verify(tokenWeb, config.JWT_SECRET, {
      ignoreExpiration: true,
    });
    delete oldToken.exp;
    delete oldToken.iat;
    delete oldToken.sub;

    const token = jwt.sign(userObj.toJSON(), config.JWT_SECRET, {
      expiresIn: "30m",
      subject: userObj.id,
    });
    const { iat, exp, sub } = jwt.decode(token);
    // API RESPONSE JWT
    res.send({ iat, exp, sub, token });
    res.end();
    next();
  } catch (err) {
    return next(err.message);
  }
});

module.exports = router;
