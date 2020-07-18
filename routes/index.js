const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/loginAuth");
const Story = require("../model/Stories");
const User = require("../model/Users");

const { create } = require("express-handlebars");
// Home
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    // console.log(req.user);
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", { name: req.user.firstname, stories });
  } catch (error) {
    console.log(error);
    res.render("/error/404");
  }
});

router.get("/create", ensureAuth, (req, res) => {
  // console.log(req.user);
  res.render("createStory", { name: req.user.firstname });
});

//  Create Comic for Readability
router.post("/", ensureAuth, async (req, res) => {
  const createComic = {
    title: req.body.title,
    category: req.body.category,
    file: req.body.file,
    user: req.user.id,
    description: req.body.description,
  };
  try {
    await Story.create(createComic);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.render("/error/404");
  }
});

module.exports = router;
