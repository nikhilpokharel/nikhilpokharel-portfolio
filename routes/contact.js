/** @format */

const router = require("express").Router();
const pages = require("../current_page");

router.get("/", (req, res) => {
  for (var i in pages) {
    pages[i] = false;
  }
  pages.contact = true;
  res.render("client/contact.ejs", {
    routesTitle: "Nikhil Pokharel - Contact",
    pages: pages,
    user: req.user,
    feedbackMsg: "",
  });
});

router.post("/", async (req, res) => {
  const userMessage = require("../models/message");
  if (
    req.body.fullName === "" ||
    req.body.email === "" ||
    req.body.feedback === ""
  ) {
    return res.redirect("/contact");
  }

  const { fullName, email, feedback } = req.body;
  const newMessage = new userMessage({
    fullName,
    email,
    feedback,
  });

  try {
    const saveMessage = await newMessage.save();
    for (var i in pages) {
      pages[i] = false;
    }
    pages.contact = true;
    res.status(200).render("client/contact.ejs", {
      routesTitle: `Thank You ${saveMessage.fullName}`,
      pages: pages,
      user: req.user,
      feedbackMsg: `Thank you for your feedback ${saveMessage.fullName}`,
    });
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

module.exports = router;
