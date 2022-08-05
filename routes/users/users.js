const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    console.log(allUsers);
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("You are unable to find user: " + err);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await User.findOneAndDelete({ username: req.body.username });
  } catch (err) {
    res.status(404).send(err);
  }
});
router.put("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ username: req.body.username }, req.body);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const exist = await User.findOne({ username: req.body.username });
    console.log(exist);
    if (!exist) {
      const hashed = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        lastLogin: Date.now(),
      });
      console.log("User created!");
      res.status(200).send({ signedUp: true });
    } else {
      console.log("user already exists");
      res.status(404).send({ signedUp: false });
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("loggin in");
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(user, match);
      if (match) {
        console.log("logged in");
        res.status(200).json({ loggedIn: true });
      } else {
        console.log("login failed");
        res.status(400).json({ loggedIn: false });
      }
    } else {
      console.log("login failed");
      res.status(400).json({ loggedIn: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

module.exports = router;
