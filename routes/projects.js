/** @format */

const router = require("express").Router();
const pages = require("../current_page");
const projects = require("../models/projects");

router.get("/", async (req, res) => {
  const allProjects = await projects.find().sort({ _id: "-1" });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.project = true;
  res.render("client/project.ejs", {
    routesTitle: "Nikhil Pokharel - Explore My Projects",
    pages: pages,
    projects: allProjects,
    user: req.user,
  });
});

router.put("/send-love/:id", async (req, res) => {
  const totalLove = await projects.findOne({ _id: req.params.id });
  totalLove.loveCounter++;
  try {
    const updateCounter = await totalLove.save();
    res.redirect("/projects");
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

module.exports = router;
