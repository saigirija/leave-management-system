var connection = require("../connection").databaseConnection;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id: id, role: "FACULTY" }, process.env.SECRETFORJWT, { expiresIn: "1d" });
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
    "select id,password from Faculty where email_id = ? and isdeleted = 0;",
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
    res.status(200).json({ email, token, role: "FACULTY" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// helping signup method for user
const signup = async (name, mobile_no, email, password, department) => {
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
    "select id from Faculty where email_id = ? and isdeleted = 0;",
    email
  );

  if (user_id[0].length) {
    throw Error("Email already in use");
  }
  // password encryption
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  let sql =
    "insert into Faculty (name,mobile_no,email_id,password,department) values (?, ?, ?, ?, ?) ;";
  let values = [name, mobile_no, email, hash, department];

  //   console.log(values);
  const id = await connection.query(sql, values);
  //   console.log(id);
  return id.insertId;
};

// main signupuser method
const signupUser = async (req, res) => {
  const { name, mobile_no, email, password, department } = req.body;
  try {
    const user_id = await signup(name, mobile_no, email, password, department);

    // create token
    // console.log(user_id);
    const token = createToken(user_id);

    res.status(200).json({ email, token, role: "FACULTY" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
