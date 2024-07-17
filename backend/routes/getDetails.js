const express = require("express");
const jwt = require("jsonwebtoken");
var connection = require("../connection").databaseConnection;
const router = express.Router();

router.get("/", async (req, res) => {
  // verify authentication
  //   console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: `Authorization token require.` });
  }
  const token = authorization.split(" ")[1];
  //   console.log(token);

  try {
    let { id, role } = jwt.verify(token, process.env.SECRETFORJWT);
    if (role === "FACULTY") {
      let sql = "select * from Faculty where id = ? and isdeleted = 0;";
      try {
        const Facultyuser = await connection.query(sql, id);
        let FacultyuserData = Facultyuser[0][0];
        res.status(200).json({ role: "FACULTY", data: FacultyuserData });
      } catch (err) {
        throw Error("unable to fetch data");
      }
    }

    if (role === "STUDENT") {
      let sql = "select * from Student where id = ? and isdeleted = 0;";
      try {
        const Studentuser = await connection.query(sql, id);
        let StudentuserData = Studentuser[0][0];
        res.status(200).json({ role: "STUDENT", data: StudentuserData });
      } catch (err) {
        throw Error("unable to fetch data");
      }
    }
  } catch (err) {
    res.status(401).json({ error: ` ${err}` });
  }
});

module.exports = router;
