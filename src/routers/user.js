const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req,res)=> {
  try {
    req.user.tokens = req.user.tokens.filter((token) => { 
      return token.token !== req.token;
     })
     await req.user.save()

     res.send('User Logged out!')
  } catch (error) {
    res.status(500).send()
  }
} )

router.post("/users/logoutAll", auth, async (req, res)=> {
  try {
      req.user.tokens = []
      await req.user.save()
      
      res.send("Logged out from all sessions!")
  } catch (error) {
    res.status(500).send("Error in logging all out!")
  }
})

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth , async (req, res) => {
  try {
    await req.user.deleteOne()
    res.send(req.user);
  } catch (error) {
    console.error("Error deleting user:", error); 
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
