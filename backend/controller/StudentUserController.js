var connection = require("../connection").databaseConnection;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id: id, role: "STUDENT" }, process.env.SECRETFORJWT, { expiresIn: "1d" });
};

//helping login method for user

const login = async function (email, password) {
  if (!email) {
    throw Error("email fields must be filled");
  }
  if (!password) {
    throw Error("Password field must be filled");
  }

  const user_id = await connection.query(
    "select id,password from Student where email_id = ? and isdeleted = 0;",
    email
  );

  if (!user_id[0].length) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user_id[0][0].password);

  if (!match) {
    throw Error("incorrect Password");
  }
  return user_id[0][0].id;
};
//main login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    const token = createToken(user);
    res.status(200).json({ email, token, role: "STUDENT" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// helping signup method for user
const signup = async (
  roll_no,
  name,
  mobile_no,
  email,
  password,
  department,
  faculty_id,
  degree,
  specialization,
  entrance
) => {
  // validation
  if (!email) {
    throw Error("email fields must be filled");
  }
  if (!password) {
    throw Error("Password field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const user_id = await connection.query(
    "select id from Student where email_id = ? and isdeleted = 0;",
    email
  );
  // console.log(user_id);

  if (user_id[0].length) {
    throw Error(`Email already in use or contact respected teacher`);
  }
  // password encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let sql =
    "insert into Student (roll_no,name,mobile_no,email_id,password,department,faculty_id,degree,specialization,entrance) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";
  let values = [
    roll_no,
    name,
    mobile_no,
    email,
    hash,
    department,
    faculty_id,
    degree,
    specialization,
    entrance,
  ];

  // console.log(values);
  const student_obj = await connection.query(sql, values);
  const id = student_obj.insertId;
  // console.log(id);
  return id;
};

// main signupuser method
const signupUser = async (req, res) => {
  const {
    roll_no,
    name,
    mobile_no,
    email,
    password,
    department,
    faculty_id,
    degree,
    specialization,
    entrance,
  } = req.body;
  try {
    const user_id = await signup(
      roll_no,
      name,
      mobile_no,
      email,
      password,
      department,
      faculty_id,
      degree,
      specialization,
      entrance
    );

    // create token
    // console.log(user_id);
    const token = createToken(user_id);

    res.status(200).json({ email, token, role: "STUDENT" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get list of all faculty
const getFacultyList = async (req, res) => {
  const faculty = await connection.query("select id,name from Faculty ;");
  // console.log(faculty[0]);
  res.json({ data: faculty[0] });
};

// update profile

const updateProfile = async (req, res) => {
  // not implemented because some-one can do pranks so i'll implement after concern.
  res.status(200).json("profile is updated");
};
module.exports = {
  loginUser,
  signupUser,
  getFacultyList,
  updateProfile,
};
