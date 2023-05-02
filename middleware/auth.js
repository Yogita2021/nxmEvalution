const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    let decoded = jwt.verify(token, "masai");
    try {
      if (decoded) {
        req.body.userID = decoded.userID;
        next();
      } else {
        res.status(400).json({ msg: "Please login" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ msg: "Please login" });
  }
};

module.exports = { auth };
