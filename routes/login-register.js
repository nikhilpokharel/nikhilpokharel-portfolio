/** @format */

const router = require("express").Router();
const pages = require("../current_page");

const bcrypt = require("bcryptjs");
const passport = require("passport");

//forward-user
const {
  forwardAuthenticated,
  ensureAuthenticated,
} = require("../config/authentication");

//registeredUsers
const users = require("../models/registration");

router.get("/login", forwardAuthenticated, (req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = false;
  pages.loginPage = true;
  res.render("login.ejs", {
    routesTitle: "Login - Nikhil Pokharel",
    pages: pages,
    message: "",
  });
});

router.get("/register", ensureAuthenticated, (req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  pages.loggedIn = false;
  pages.loginPage = true;
  res.render("register.ejs", {
    routesTitle: "Register - Nikhil Pokharel",
    pages: pages,
    email_err: "",
  });
});

//update-user
router.put("/update-user", ensureAuthenticated, async (req, res) => {
  const findEmail = await users.findOne({ _id: req.user._id });
  if (req.body.fullName === "" || req.body.email === "") {
    return res.redirect("/admin/setting");
  }
  findEmail.fullName = req.body.fullName;
  findEmail.email = req.body.email;

  try {
    const updateUser = await findEmail.save();
    res.redirect("/admin/setting");
  } catch (err) {
    if (err) console.error(err);
  }
});
router.put("/update-credentials", ensureAuthenticated, async (req, res) => {
  const getEmail = await users.findOne({ email: req.user.email });
  const { oldPassword, newPassword } = req.body;
  const comparePassword = await bcrypt.compare(oldPassword, getEmail.password);

  if (!comparePassword) {
    for (var i in pages) {
      pages[i] = false;
    }
    pages.loggedIn = true;
    pages.admin = true;
    return res.status(200).render("admin/setting.ejs", {
      routesTitle: "Old Password Doesnot Match",
      pages: pages,
      adminDetails: req.user,
      incorrectPassword: "Old Password Not Matched",
    });
  }

  const newPass = await bcrypt.hashSync(
    newPassword,
    await bcrypt.genSaltSync(10)
  );

  getEmail.password = newPass;
  try {
    const updatePassword = await getEmail.save();
    res.redirect("/admin/setting");
  } catch (err) {
    if (err) console.error(err);
  }
});

//adding-new-user
router.post("/register", ensureAuthenticated, async (req, res) => {
  const checkEmail = await users.findOne({ email: req.body.email });
  if (checkEmail) {
    for (var i in pages) {
      pages[i] = false;
    }
    pages.loggedIn = false;
    pages.loginPage = true;
    res.status(404).render("register.ejs", {
      routesTitle: "Register || Nikhil Pokharel",
      pages: pages,
      email_err: "User with that email already exists",
    });
    return false;
  }
  var currentPassword = req.body.password
    ? await bcrypt.hashSync(req.body.password, await bcrypt.genSaltSync(10))
    : "";
  const addUser = new users({
    fullName: req.body.fullName,
    email: req.body.email,
    password: currentPassword,
    admin: req.body.admin,
  });
  try {
    const saveUser = await addUser.save();
    res.redirect("/user/login");
  } catch (err) {
    if (err) console.error(err);
  }
});

//user-login
router.post("/login", forwardAuthenticated, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
