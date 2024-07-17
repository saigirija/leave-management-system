const express = require("express");
const {
  getPendingApplication,
  getAllApplications,
  getSingleApplicationForm,
  updateStatusOfLeaveApplication,
  getStudentInfo,
  deleteAllApplicationForm,
  getStudentLeaveInfo,
} = require("../controller/facultyActionController");
const requireAuth = require("../middleware/FacultyrequireAuth");
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// GET all pending req for history
router.get("/pendingapplication", getPendingApplication);

// GET all req handled by faculty
router.get("/allapplication", getAllApplications);

// GET a single form
router.get("/application/:id", getSingleApplicationForm);

// change status and write comment for an application
router.post("/updatestatus", updateStatusOfLeaveApplication);

// GET student details
router.get("/getstudent/:id", getStudentInfo);

// GET student leave history
router.get("/getstudentleaves/:id", getStudentLeaveInfo);

// DELETE all application application form under faculty
router.post("/deleteallapplication", deleteAllApplicationForm);

module.exports = router;
