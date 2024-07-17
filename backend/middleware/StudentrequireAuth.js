const jwt = require("jsonwebtoken");
var connection = require("../connection").databaseConnection;

const requireAuth = async (req, res, next) => {
  // verify authentication
  //   console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: `Authorization token require.` });
  }
  const token = authorization.split(" ")[1];
  // console.log(token);

  try {
    let { id } = jwt.verify(token, process.env.SECRETFORJWT);
    let sql = "select id from Student where id = ? and isdeleted = 0;";
    try {
      const Studentuser = await connection.query(sql, id);
      req.Studentuser = Studentuser[0][0].id;
      next();
    } catch (err) {
      res.status(401).json({ error: `request is not authorized ${err}` });
    }
  } catch (err) {
    res.status(401).json({ error: `request is not authorized ${err}` });
  }
};

module.exports = requireAuth;
