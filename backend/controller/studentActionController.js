var connection = require("../connection").databaseConnection;

// get all previous history
const getHistory = async (req, res) => {
  let sql = `select * from Leave_Application where s_id = ${req.Studentuser} and isdeleted = 0;`;
  try {
    let ans = await connection.query(sql);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// get single application form
const getSingleApplicationForm = async (req, res) => {
  const { id } = req.params;
  let sql = `select * from Leave_Application where id = ?`;
  try {
    let ans = await connection.query(sql, id);
    res.json({ data: ans[0] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
  //   res.json({ data: `post single data ${id}` });
};

// create a new leave application
const createApplicationForm = async (req, res) => {
  const {
    leave_type,
    no_of_leaves,
    starting_date,
    ending_date,
    reason,
    document_attached,
    document,
  } = req.body;
  const s_id = req.Studentuser;
  try {
    const fa_object = await connection.query(
      `select faculty_id from Student where id = ?`,
      s_id
    );
    const f_id = fa_object[0][0].faculty_id;
    // console.log(f_id);
    let sql = `insert into Leave_Application(s_id,f_id,leave_type,no_of_leaves,starting_date,ending_date,reason,document_attached,document) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let values = [
      s_id,
      f_id,
      leave_type,
      no_of_leaves,
      starting_date,
      ending_date,
      reason,
      document_attached,
      document,
    ];
    try {
      const leave_app_obj = await connection.query(sql, values);
      // const leave_id = leave_app_obj.insertId;
      // console.log(leave_app_obj);

      res.status(200).json({
        created: true,
        data: `leave application from ${starting_date} to ${ending_date} is successfully created`,
      });
    } catch (err) {
      throw Error(`there is problem in values please re-enter values`);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// update a leave application
const updateApplicationForm = async (req, res) => {
  const {
    leave_application_id,
    leave_type,
    no_of_leaves,
    starting_date,
    ending_date,
    reason,
    document_attached,
    document,
  } = req.body;
  try {
    sql = `select * from Leave_Application where id = ?`;
    const leave_app_obj = await connection.query(sql, leave_application_id);
    const leave_obj = leave_app_obj[0][0];
    if (leave_obj.isdeleted === 1) {
      throw Error("this application is deleted. so you can't change it.");
    }
    if (leave_obj.status === "rejected" || leave_obj.status === "approved") {
      throw Error(
        `you can't change it because status of application is changed to : ['${leave_obj.status}'] by FA.`
      );
    }
    console.log(leave_app_obj[0][0]);
    try {
      let sql = `update Leave_Application set leave_type = ?,
        no_of_leaves = ?,
        starting_date = ?,
        ending_date = ?,
        reason = ?,
        document_attached = ?,
        document = ? where id = ? and f_id = ? ;`;
      let values = [
        leave_type,
        no_of_leaves,
        starting_date,
        ending_date,
        reason,
        document_attached,
        document,
        req.Studentuser,
        leave_obj.f_id,
      ];
      const updated_obj = await connection.query(sql, values);
      console.log(updated_obj);
      res.status(200).json({
        updated: true,
        data: `application is updated as followed : 
        leave_type = ${leave_type},
        no. of leaves = ${no_of_leaves},
        starting_date = ${starting_date},
        ending_date = ${ending_date},
        reason = ${reason},
        document_attached = ${document_attached}, `,
      });
    } catch (err) {
      res.status(401).json({ data: `error in updation : ${err}` });
    }
  } catch (err) {
    res.status(401).json({ data: `${err}` });
  }
};

// delete a leave application
const tempDeleteApplicationForm = async (req, res) => {
  const { leave_application_id } = req.body;
  if (!leave_application_id) {
    res
      .status(401)
      .json({ data: "please send the correct leave_application_id" });
  }

  try {
    let sql = `select * from Leave_Application where id = ? and s_id = ? and isdeleted = 0;`;
    const leave_del_obj = await connection.query(sql, [
      leave_application_id,
      req.Studentuser,
    ]);
    const leave_obj = leave_del_obj[0][0];
    console.log(leave_obj);

    try {
      if (leave_obj.status === "pending") {
        sql = `update Leave_Application set isdeleted = 1 where id = ?`;
        const delete_leave_obj = await connection.query(
          sql,
          leave_application_id
        );
        res.status(200).json({
          deleted: true,
          data: `leave application of type ${leave_obj.leave_type} from ${leave_obj.starting_date} to ${leave_obj.ending_date} for reason [${leave_obj.reason}] is deleted.`,
        });
      } else {
        res.status(200).json({
          deleted: false,
          data: `you can't delete this leave because it is updated to ${leave_obj.status}.`,
        });
      }
    } catch (err) {
      throw Error("can't deleted " + err);
    }
  } catch (err) {
    res.json({ data: `leave application is already deleted or not exist. ` });
  }
};

module.exports = {
  getHistory,
  getSingleApplicationForm,
  createApplicationForm,
  updateApplicationForm,
  tempDeleteApplicationForm,
};
