require("dotenv").config();
const express = require("express");
const studentActionRoutes = require("./routes/studentAction");
const studentUserRoutes = require("./routes/studentUser");
const facultyUserRoutes = require("./routes/facultyUser");
const FacultyActionRoutes = require("./routes/facultyAction");
const GetDetailsRoutes = require("./routes/getDetails")
const app = express();

// middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/apiv1/student/", studentUserRoutes);
app.use("/apiv1/faculty/", facultyUserRoutes);
app.use("/apiv1/studentaction/", studentActionRoutes);
app.use("/apiv1/facultyaction/", FacultyActionRoutes);
app.use("/apiv1/getdetails/",GetDetailsRoutes)

// listen for request
app.listen(process.env.PORT, () => {
  console.log("connected to db and server is started on " + process.env.PORT);
});

module.exports = app;
