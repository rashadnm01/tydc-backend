const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");

router.get("/", (req, res) => {
  res.send("all users will be seen ehere");
});
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = User.findById(id);
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
    await User.findOneAndUpdate({ username: req.body, username }, req.body);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const exist = await User.findOne({ username: req.body.username });
    if (!exist) {
      const hashed = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: hashed,
        email: req.body.email,
      });
      res.status(200).json(user);
    } else {
      res.status(400).send("Please choose a different username!");
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      res.status(200).send({ match });
    }
  } catch (err) {
    res.send("Could not login: " + err);
  }
});

module.exports = router;
