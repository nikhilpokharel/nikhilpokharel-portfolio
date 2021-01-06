/** @format */

const router = require("express").Router();
const pages = require("../current_page");

const about = require("../models/about");
const projects = require("../models/projects");
router.get("/", async (req, res) => {
  const aboutMe = await about.findOne();
  const allProjects = await projects.find().sort({ _id: "-1" }).limit(3);
  for (var i in pages) {
    pages[i] = false;
  }
  pages.about = true;
  res.render("client/about.ejs", {
    routesTitle: "NIkhil Pokharel - About",
    pages,
    about: aboutMe,
    projects: allProjects,
    user: req.user,
  });
});

module.exports = router;
