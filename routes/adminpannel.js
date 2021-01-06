const router = require("express").Router();
const pages = require("../current_page");

const introduction = require("../models/introduction");
const users = require("../models/registration.js");
const about = require("../models/about");
const focuses = require("../models/focuses");
const allProjects = require("../models/projects");
const allSkills = require("../models/skills");
const socialLinks = require("../models/social-links");

const usersMessages = require("../models/message");

router.get("/dashboard", async (req, res) => {
  const changeIntro = await introduction.findOne();
  const changeFocus = await focuses.findOne();
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminHome = true;
  res.render("admin/dashboard.ejs", {
    routesTitle: "Admin",
    pages: pages,
    adminDetails: req.user,
    introduction: changeIntro,
    focus: changeFocus,
  });
});

//update-social-link
router.get("/update-social-links/:id", async (req, res) => {
  const findSocials = await socialLinks.findOne({ _id: req.params.id });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  res.render("admin/update/update-links.ejs", {
    routesTitle: "Update Social Links",
    pages: pages,
    links: findSocials,
    adminDetails: req.user,
  });
});

router.get("/update-current-skills/:id", async (req, res) => {
  const findSkills = await allSkills.findOne({ _id: req.params.id });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  res.render("admin/update/update-skills.ejs", {
    routesTitle: "Update Skills",
    pages: pages,
    skills: findSkills,
    adminDetails: req.user,
  });
});

// about-me
router.get("/about-me", async (req, res) => {
  const changeAbout = await about.findOne();
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  (pages.adminAbout = true),
    res.render("admin/about.ejs", {
      routesTitle: "Update About",
      pages: pages,
      adminDetails: req.user,
      about: changeAbout,
    });
});
// my-projects
router.get("/projects", (req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminProject = true;
  res.render("admin/projects.ejs", {
    routesTitle: "Add New Projects",
    pages: pages,
    adminDetails: req.user,
  });
});

router.get("/update-project/:id", async (req, res) => {
  const findProject = await allProjects.findOne({ _id: req.params.id });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminProject = true;
  res.render("admin/update/update-projects.ejs", {
    routesTitle: "Update Project",
    pages: pages,
    project: findProject,
    adminDetails: req.user,
  });
});

// my-messages
router.get("/messages", async (req, res) => {
  const allMessage = await usersMessages.find().sort({ _id: "-1" });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminMessage = true;
  res.render("admin/messages.ejs", {
    routesTitle: "Users Feedback",
    pages: pages,
    allMessage: allMessage,
    adminDetails: req.user,
  });
});

//registered-users
router.get("/registered-users", async (req, res) => {
  const allUsers = await users.find().sort({ _id: "-1" });
  const activeUser = await users.findOne({ email: req.user.email });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminRegisteredUsers = true;
  res.render("admin/registeredUsers.ejs", {
    routesTitle: "All Registered Users",
    pages: pages,
    adminDetails: req.user,
    activeUser: activeUser.email,
    registeredUsers: allUsers,
  });
});

router.delete("/registered-users/delete/:id", async (req, res) => {
  await users.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/registered-users");
});

router.delete("/messages/delete/:id", async (req, res) => {
  await usersMessages.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/messages");
});
router.put("/messages/approved/:id", async (req, res) => {
  const findMessages = await usersMessages.findOne({ _id: req.params.id });
  findMessages.show = req.body.show;

  try {
    const approveMsg = await findMessages.save();
    res.redirect("/admin/messages");
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

// manage-datas
const socialMedias = require("../models/social-links");
const skills = require("../models/skills");
const projects = require("../models/projects");
const message = require("../models/message");

router.get("/datas", async (req, res) => {
  const allSocialMedias = await socialMedias.find();
  const allSkills = await skills.find();
  const allProjects = await projects.find().sort({ _id: "-1" });
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  pages.adminData = true;
  res.render("admin/manage_data/data.ejs", {
    routesTitle: "Data Setting",
    pages: pages,
    adminDetails: req.user,
    socialMedia: allSocialMedias,
    skills: allSkills,
    projects: allProjects,
  });
});

//setting
router.get("/setting", (req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = true;
  pages.admin = true;
  res.render("admin/setting.ejs", {
    routesTitle: "Account Setting",
    pages: pages,
    adminDetails: req.user,
    incorrectPassword: "",
  });
});

// Logout
router.delete("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/user/login");
});

module.exports = router;
