/** @format */

const router = require("express").Router();
const pages = require("../current_page");

const intro = require("../models/introduction");
const links = require("../models/social-links");
const profileImg = require("../models/about");
const focus = require("../models/focuses");
const skills = require("../models/skills");
const projects = require("../models/projects");
const userMsg = require("../models/message");

router.get("/", async (req, res) => {
  const introduction = await intro.findOne();
  const socialLinks = await links.find();
  const profilePic = await profileImg.findOne();
  const focuses = await focus.findOne();
  const skillSet = await skills.find();
  const projectSet = await projects.find().sort({ _id: "-1" }).limit(3);
  const testimonial = await userMsg.find().sort({ _id: "-1" }).limit(4);

  for (var i in pages) {
    pages[i] = false;
  }
  pages.index = true;
  res.render("client/index.ejs", {
    routesTitle: "Nikhil Pokharel - Self Taught Programmer",
    pages: pages,
    introduction: introduction,
    links: socialLinks,
    profileImage: profilePic,
    focus: focuses,
    skills: skillSet,
    projects: projectSet,
    user: req.user,
    testimonial: testimonial,
  });
});

module.exports = router;
