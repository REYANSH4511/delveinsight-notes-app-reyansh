const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  const newToken=token.split(" ")[1]
  try {
    const decoded = jwt.verify(newToken, "MY_NOTES_AUTH");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
};

module.exports = verifyToken;
