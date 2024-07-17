const express = require("express");
const requireAuth = require("../middleware/StudentrequireAuth");

const router = express.Router();
const {
  loginUser,
  signupUser,
  getFacultyList,
  updateProfile,
} = require("../controller/StudentUserController");
// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// get all faculty list
router.get("/facultylist", getFacultyList);

// update profile
router.post("/updateprofile",requireAuth,updateProfile)

module.exports = router;
