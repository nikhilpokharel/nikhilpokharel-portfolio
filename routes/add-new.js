if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

var storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// use mutler as a middleware
var middleware = multer({ storage: storage }).single("profilePic");

//for home-page-introduction
const introduction = require("../models/introduction");

router.put("/introduction/:id", async (req, res) => {
  if (req.body.profileName === "" || req.body.profileDescription === "") {
    return res.redirect("/admin/dashboard");
  }
  const newIntro = await introduction.findOne({ _id: req.params.id });
  newIntro.profileName = req.body.profileName;
  newIntro.profileDescription = req.body.profileDescription;
  try {
    const updateIntro = await newIntro.save();
    res.redirect("/admin/dashboard");
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

//for-social-media-icons
const socialLink = require("../models/social-links");

router.post("/social-links", async (req, res) => {
  const { icode, link } = req.body;
  if (req.body.icode === "" || req.body.link === "") {
    return res.redirect("/admin/dashboard");
  }
  const newSocial = new socialLink({ icode, link });
  try {
    const saveSocial = await newSocial.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
  }
});
//deleting social-links
router.delete("/delete-socials/:id", async (req, res) => {
  await socialLink.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/datas");
});
//updating-social-links
router.put("/update-links/:id", async (req, res) => {
  if (req.body.icode === "" || req.body.link === "") {
    return res.redirect(`/admin/update-social-links/${req.params.id}`);
  }
  const oldLinks = await socialLink.findOne({ _id: req.params.id });
  oldLinks.icode = req.body.icode;
  oldLinks.link = req.body.link;
  try {
    const updateLinks = await oldLinks.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
  }
});

//front-end/backend-focuses
const focuses = require("../models/focuses");
router.put("/focuses/:id", async (req, res) => {
  if (
    req.body.titleOne === "" ||
    req.body.descriptionOne === "" ||
    req.body.titleTwo === "" ||
    req.body.descriptionTwo === ""
  ) {
    return res.redirect("/admin/dashboard");
  }
  const newFocuses = await focuses.findOne({ _id: req.params.id });
  newFocuses.titleOne = req.body.titleOne;
  newFocuses.descriptionOne = req.body.descriptionOne;
  newFocuses.titleTwo = req.body.titleTwo;
  newFocuses.descriptionTwo = req.body.descriptionTwo;
  try {
    const updateFocus = await newFocuses.save();
    res.redirect("/admin/dashboard");
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

//for-skills
const skills = require("../models/skills");

router.post("/skills", middleware, async (req, res) => {
  const imagePath = req.file ? req.file.path : "";
  const { skillTitle, skillList, skillLink } = req.body;

  if (
    req.body.skillTitle === "" ||
    req.body.skillList === "" ||
    req.body.skillLink === ""
  ) {
    imagePath ? deleteFile(imagePath) : "";
    return res.redirect("/admin/dashboard");
  }

  const newSkills = new skills({ skillTitle, skillLink, skillList });

  try {
    await cloudinary.uploader.upload(imagePath, (result, err) => {
      if (err) console.error(err);
      newSkills.profilePic = result.secure_url;
      newSkills.imageId = result.public_id;
    });
    imagePath ? deleteFile(imagePath) : "";
    const saveSkill = await newSkills.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
    imagePath ? deleteFile(imagePath) : "";
  }
});

//deleting skills
router.delete("/delete-skills/:id", async (req, res) => {
  const deleteSkills = await skills.findOne({ _id: req.params.id });
  await cloudinary.uploader.destroy(deleteSkills.imageId, (result) => {
    console.error(result);
  });
  await skills.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/datas");
});

//updating skills
router.put("/update-skills/:id", middleware, async (req, res) => {
  const imagePath = req.file ? req.file.path : "";
  if (
    req.body.skillTitle === "" ||
    req.body.skillList === "" ||
    req.body.skillLink === ""
  ) {
    imagePath ? deleteFile(imagePath) : "";
    return res.redirect("/admin/dashboard");
  }

  const oldSkills = await skills.findOne({ _id: req.params.id });
  oldSkills.skillTitle = req.body.skillTitle;
  oldSkills.skillList = req.body.skillList;
  oldSkills.skillLink = req.body.skillLink;

  imagePath
    ? await cloudinary.uploader.destroy(oldSkills.imageId, (result) => {
        console.log(result);
      })
    : "";

  try {
    imagePath
      ? await cloudinary.uploader.upload(imagePath, (result, err) => {
          if (err) console.error(err);
          oldSkills.profilePic = result.secure_url;
          oldSkills.imageId = result.public_id;
        })
      : "";
    imagePath ? deleteFile(imagePath) : "";
    const updateSkill = await oldSkills.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
    imagePath ? deleteFile(imagePath) : "";
  }
});

//for-about-page
const about = require("../models/about");

router.put("/about-me/:id", middleware, async (req, res, next) => {
  const imagePath = req.file ? req.file.path : "";
  if (req.body.description === "") {
    deleteFile(imagePath);
    return res.redirect("/admin/about-me");
  }
  const newAbout = await about.findOne({ _id: req.params.id });

  imagePath
    ? await cloudinary.uploader.destroy(newAbout.imageId, (result) => {
        console.log(result);
      })
    : "";
  newAbout.description = req.body.description;

  try {
    // uploading-image
    imagePath
      ? await cloudinary.uploader.upload(imagePath, async (result, err) => {
          if (err) console.error(err);
          newAbout.imageId = result.public_id;
          newAbout.profilePic = result.secure_url;
        })
      : "";
    imagePath ? deleteFile(imagePath) : "";
    const updateAbout = await newAbout.save();
    res.redirect("/admin/about-me");
  } catch (err) {
    if (err) console.error(err);
  }
});

// for-adding-project
const project = require("../models/projects");

router.post("/projects", middleware, async (req, res, next) => {
  const imagePath = req.file ? req.file.path : "";

  const { projectName, projectLink, projectDemo, description } = req.body;
  if (
    projectName === "" ||
    projectLink === "" ||
    projectDemo === "" ||
    description === ""
  ) {
    imagePath ? deleteFile(imagePath) : "";
    return res.redirect("/admin/projects");
  }

  const newProject = new project({
    projectName,
    projectLink,
    projectDemo,
    description,
  });

  try {
    await cloudinary.uploader.upload(imagePath, (result, err) => {
      if (err) console.error(err);
      newProject.profilePic = result.secure_url;
      newProject.imageId = result.public_id;
    });
    deleteFile(imagePath);

    const saveProject = await newProject.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
    imagePath ? deleteFile(imagePath) : "";
  }
});

//for-deleting-project
router.delete("/delete-project/:id", async (req, res) => {
  const deleteProject = await project.findOne({ _id: req.params.id });
  await cloudinary.uploader.destroy(deleteProject.imageId, (result) => {
    console.error(result);
  });
  await project.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/datas");
});

// for-updating-project
router.put("/project-update/:id", middleware, async (req, res, next) => {
  const imagePath = req.file ? req.file.path : "";
  if (
    req.body.projectName === "" ||
    req.body.projectLink === "" ||
    req.body.projectDemo === "" ||
    req.body.description === ""
  ) {
    imagePath ? deleteFile(imagePath) : "";
    return res.redirect("/admin/projects");
  }

  const oldProject = await project.findOne({ _id: req.params.id });
  imagePath
    ? await cloudinary.uploader.destroy(oldProject.imageId, (result) => {
        console.error(result);
      })
    : "";
  oldProject.projectName = req.body.projectName;
  oldProject.projectLink = req.body.projectLink;
  oldProject.projectDemo = req.body.projectDemo;
  oldProject.description = req.body.description;

  try {
    imagePath
      ? await cloudinary.uploader.upload(imagePath, (result, err) => {
          if (err) console.error(err);
          oldProject.profilePic = result.secure_url;
          oldProject.imageId = result.public_id;
        })
      : "";
    imagePath ? deleteFile(imagePath) : "";
    const updateProject = await oldProject.save();
    res.redirect("/admin/datas");
  } catch (err) {
    if (err) console.error(err);
    imagePath ? deleteFile(imagePath) : "";
  }
});

//deleting-image-from-server-after-upload
function deleteFile(path) {
  if (path) {
    fs.unlink(path, (err) => {
      if (err) console.error(err);
      console.log("file deleted");
    });
  }
}
module.exports = router;
