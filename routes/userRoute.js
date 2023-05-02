const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel } = require("../model/user.model");
const userRoute = express.Router();

// register request
userRoute.post("/register", async (req, res) => {
  const { name, email, password, city, age } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send({ msg: "user already exists!!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        // Store hash in your password DB.
        let newuser = new UserModel({ name, email, password: hash, city, age });
        await newuser.save();
        res.status(200).json({ msg: "New user registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login Route

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.status(200).json({ msg: "Please register first" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, username: user.name },
            "masai"
          );
          res.status(200).json({ msg: "Login succesful!!", token: token });
        } else {
          res.status(200).json({ msg: "Wrong credential" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRoute };
