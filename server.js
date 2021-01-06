/** @format */

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const pages = require("./current_page");
const methodOverride = require("method-override");

app.use("/public", express.static("public"));

//check-valid-user
const { ensureAuthenticated } = require("./config/authentication");

// Passport Config
require("./config/passport")(passport);

// listening to database
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!!!"))
  .catch((err) => console.error(err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(layouts);
app.set("layout", "layouts/layout");

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Global Variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//login-register
app.use("/user", require("./routes/login-register"));

// router-middleware-initialized
app.use("/", require("./routes/index"));
app.use("/about", require("./routes/about"));
app.use("/projects", require("./routes/projects"));
app.use("/contact", require("./routes/contact"));

//protected-route-middleware
app.use("/admin", ensureAuthenticated, require("./routes/adminpannel"));
app.use("/add-new", ensureAuthenticated, require("./routes/add-new"));

app.use((req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  res.render("404.ejs", {
    routesTitle: "Page Not Found",
    pages: pages,
    user: req.user,
  });
});

// listening to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
