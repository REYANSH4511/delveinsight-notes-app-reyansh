const getMessage = require("../message");
const responseHandler = require("../utils/responseHandler");
const Users = require("./model");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return responseHandler({
        res,
        statusCode: 400,
        status: "error",
        message: getMessage("M001"),
      });
    }

    const user = await Users.create({ name, email, password });
    const token = jwt.sign({ user }, "MY_NOTES_AUTH", {
      expiresIn: "3h",
    });
    res.header("Authorization", token);
    return responseHandler({
      res,
      statusCode: 200,
      status: "success",
      message: getMessage("M002"),
      data: user,
    });
  } catch (err) {
    return responseHandler({
      res,
      statusCode: 400,
      status: "error",
      message: err.message,
    });
  }
};
