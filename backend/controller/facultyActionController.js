var connection = require("../connection").databaseConnection;

// get all pending application
const getPendingApplication = async (req, res) => {
  let sql = `select * from Leave_Application join Student on Student.id = Leave_Application.s_id where status="pending" and f_id = ? and isdeleted = 0;`;
  try {
    let ans = await connection.query(sql, req.Facultyuser);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get all previously handled applications deleted and non deleted
const getAllApplications = async (req, res) => {
  let sql = `select * from Leave_Application where f_id = ?;`;
  try {
    let ans = await connection.query(sql, req.Facultyuser);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get a single application form
const getSingleApplicationForm = async (req, res) => {
  const { id } = req.params;
  try {
    let sql = `select * from Leave_Application where id = ?`;
    let ans = await connection.query(sql, id);
    console.log(ans);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// update status of application and write comment
const updateStatusOfLeaveApplication = async (req, res) => {
  const { leave_application_id, status, status_comment } = req.body;
  try {
    let sql = `update Leave_Application set status=?,status_comment=? where id = ? and f_id = ? and isdeleted = 0`;
    let values = [
      status,
      status_comment,
      leave_application_id,
      req.Facultyuser,
    ];
    const updated_obj = await connection.query(sql, values);
    const leave_app_obj = await connection.query(
      `select * from Leave_Application where id = ?;`,
      leave_application_id
    );
    const leave_obj = leave_app_obj[0][0];
    const student_id = leave_obj.s_id;
    const leave_type = leave_obj.leave_type;
    const fetch_student_obj = await connection.query(
      `select * from Student where id = ?`,
      student_id
    );
    const student_obj = fetch_student_obj[0][0];
    // console.log(student_obj);
    // if medical_leave
    if (leave_type === "medical_leave") {
      const remaining_medical_leave =
        student_obj.remaining_medical_leave - leave_obj.no_of_leaves;
      const update_medical_leave = connection.query(
        `update Student set remaining_medical_leave = ? where id = ?; `,
        [remaining_medical_leave, student_id]
      );
    } else if (leave_type === "casual_leave") {
      const remaining_casual_leave =
        student_obj.remaining_casual_leave - leave_obj.no_of_leaves;
      const update_casual_leave = connection.query(
        `update Student set remaining_casual_leave = ? where id = ?; `,
        [remaining_casual_leave, student_id]
      );
    }
    // if casual_leave
    // const update_remaining_leaves = null;
    res.status(200).json({
      updated: true,
      data: `you changed status to ['${status}'] and write comment : ['${status_comment}'] for that.`,
    });
  } catch (err) {
    res.status(401).json({ data: `error in updation : ${err}` });
  }
};

// get a student info

const getStudentInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let sql = `select roll_no,name,mobile_no,email_id,department,degree,specialization,entrance,remaining_casual_leave,remaining_medical_leave from Student where id = ? and faculty_id = ?`;
    let ans = await connection.query(sql, [id, req.Facultyuser]);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
// get a student leave info

const getStudentLeaveInfo = async (req, res) => {
  const { id } = req.params;
  try {
    let sql = `select * from  Leave_Application join Student on Student.id = Leave_Application.s_id where s_id = ? and f_id = ?;`;
    let ans = await connection.query(sql, [id, req.Facultyuser]);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// delete all the leave application permenetally belonging to faculty
const deleteAllApplicationForm = async (req, res) => {
  try {
    const delete_apps = await connection.query(
      "delete from Leave_Application where f_id = ?",
      req.Facultyuser
    );
    res.status(200).json({
      deleted: true,
      data: "all applications are permenetaly deleted and can't restore.",
    });
  } catch (err) {
    res.status(401).json({ data: "error in deletation", error: err });
  }
};

module.exports = {
  getPendingApplication,
  getAllApplications,
  getSingleApplicationForm,
  updateStatusOfLeaveApplication,
  getStudentInfo,
  deleteAllApplicationForm,
  getStudentLeaveInfo,
};
