const UserModel = require("../model/userModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const { CustomError } = require("../errors/CustomErrorHandler");
const authUser = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await UserModel.findById({_id: userID}).select("-Password");
      if(req.user.role === "user"){
          req.roles = true;
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 401).json({ message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ message: "Unauthorized user No token", status: "failure" });
  }
};

module.exports = authUser;
