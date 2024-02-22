/******all the required imports are in the same file***/
const UserModel = require("../model/userModel");
const {
  signUpValidation,
  loginValidation,
  changePasswordValidation,
  sendEmailResetPasswordValidation,
  passwordUpdateValidation,
  loginStaffValidation,
  createStaffValidation,
} = require("../validation/authValidation");
const { CustomError } = require("../errors/CustomErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {
  sendEmailToGenerate_newPassword,
  link,
  sentOTP,
} = require("../helpers/messageHelper");

const signupController = async (req, res) => {
  try {
    let user;
    let currentNumericPart;
    let currentAlphabeticPart;
    let user_code;
    let userObject = req.body;
    // console.log(userObject)
    const result = signUpValidation.validate(userObject);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    else {
      console.log(userObject)
      // const otp = Math.floor(100000 + Math.random() * 900000);
      // await sentOTP(otp,req.body.email);
      if (req.body.roles == "vendor")
      user = await UserModel.find({ user_code: /V/i })
      .sort({ _id: -1 })
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
       
      else if (req.body.roles == "admin")
        user = await UserModel.find({ user_code: /A/i })
          .sort({ _id: -1 })
          .catch((e) => {
            throw new CustomError(e.message, "Database Call Failed", 500);
          });
      else
        user = await UserModel.find({ user_code: /C/i })
        .sort({ _id: -1 })
        .catch((e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        });

      if (user.length == 0 && req.body.roles == "customer") {
        currentNumericPart = "000000";
        currentAlphabeticPart = "AA";
        user_code =
          "C" +
          generateAutoIncrementId(currentNumericPart, currentAlphabeticPart);
      } else if (user.length == 0 && req.body.roles == "admin") {
        currentNumericPart = "000000";
        currentAlphabeticPart = "AA";
        user_code =
          "A" +
          generateAutoIncrementId(currentNumericPart, currentAlphabeticPart);
      } else if (user.length == 0 && req.body.roles == "vendor") {
        currentNumericPart = "000000";
        currentAlphabeticPart = "AA";
        user_code =
          "V" +
          generateAutoIncrementId(currentNumericPart, currentAlphabeticPart);
      } else {
        let latestUser = user[0].user_code;
        currentNumericPart = latestUser.substring(3);
        currentAlphabeticPart = latestUser.substring(1, 3);
        user_code =
          latestUser.substring(0, 1) +
          generateAutoIncrementId(currentNumericPart, currentAlphabeticPart);
      }
      const { password, confirmPassword } = userObject;
      if (password != confirmPassword)
        throw new CustomError(
          "",
          "Password and confirmPassword are not the same",
          400
        );

      let usermail = await UserModel.findOne({ email: userObject.email }).catch(
        (e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        }
      );
      if (usermail) {
        throw new CustomError(
          "",
          "You have already used this email !please log in",
          400
        );
      }

      userObject = { ...userObject, user_code: user_code  };
      let newUser = await UserModel.create(userObject).catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });

      // jwt authentication start
      let token = jwt.sign(
        { userID: newUser._id, roles: newUser.roles },
        process.env.SECRET_KEY
      );

      if (newUser) {
        const { password, ...responseUser } = newUser._doc;
        res.status(201).json({
          message: "user created successfully",
          user: responseUser,
          token: token,
          status: "success",
        });
      }
    }
    // end
  } catch (error) {
    console.log("error is ",error.message,"error status code ",error.statusCode)
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

//user login function
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = loginValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    let user = await UserModel.findOne({ email }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if (!user) {
      throw new CustomError("", "Invalid email", 401);
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        let token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
        res.status(200).json({
          message: "Login successful",
          token: token,
          varifyStatus: user.varifyStatus,
          roles: user.roles,
        });
      } else throw new CustomError("Invalid password", "Invalid password", 403);
    }
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};
// password change function :- if user login and change the password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, password, confirmPassword } = req.body;
    const result = changePasswordValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    if (password != confirmPassword)
      throw new CustomError(
        "The password and confirmation password do not match.",
        "The password and confirmation password do not match.",
        401
      );
    let user = await UserModel.findOne({ _id: req.user._id }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (passwordMatch) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.findOneAndUpdate(req.user._id, {
        $set: {
          password: hashedPassword,
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          message: "Password successfully changed",
        })
        .catch((e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        });
    } else
      throw new CustomError(
        "Your current password doesn't matched",
        "Your current password doesn't matched",
        401
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};

// Email send :- forget password
const sendEmailResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = sendEmailResetPasswordValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    let user = await UserModel.findOne({ email }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if (user) {
      let secret = user._id + process.env.SECRET_KEY;
      let token = jwt.sign({ userID: user._id }, secret, { expiresIn: "15m" });

      let passwordResetLink = `${link}/${user._id}/${token}`;

      // console.log(passwordResetLink);
      await sendEmailToGenerate_newPassword(
        user.name,
        user.email,
        passwordResetLink
      );
      res.status(200).json({
        message: "Email Sent!Please check your mail to reset password",
      });
    } else
      throw new CustomError(
        "You are not Signed In.Please Sign Up",
        "You are not Signed In.Please Sign Up",
        400
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};

// update password
const passwordUpdate = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;
    const result = passwordUpdateValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    if (password != confirmPassword)
      throw new CustomError(
        "password and confirmPassword should be same",
        "password and confirmPassword should be same",
        400
      );
    let user = await UserModel.findById({ _id: id }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if (user) {
      let new_secret = user._id + process.env.SECRET_KEY;
      var decoded = jwt.verify(token, new_secret);
      if (decoded) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.findOneAndUpdate(user._id, {
          $set: {
            password: hashedPassword,
          },
        }).catch((e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        });
        res.status(200).json({ message: "Successfully updated" });
      } else {
        res.status(500).json({ message: "Expired URL" });
      }
    } else
      throw new CustomError(
        "Please login through correct credentials",
        "Please login through correct credentials",
        400
      );
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};

// logout api funtion
const logout = async (req, res) => {
  try {
    let token;
    const { authorization } = req.headers;
    token = authorization.split(" ")[1];
    res.status(201).json({ message: "Logout successful" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// delete user function
const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failure" });
  }
};

// profile update
const profileUpdate = async (req, res) => {
  try {
    const profileUpdate = {
      name,
      number,
      email,
      state,
      city,
      pincode,
      address,
    } = req.body;

    let user = await UserModel.findOne({
      _id: req.params.id,
      verifyStatus: false,
    }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if (user) {
      const profile = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: profileUpdate,
        },
        { new: true }
      ).catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
      res
        .status(200)
        .json({ data: profile, message: "Your profile has been updated" });
    } else {
      throw new CustomError(
        "You are not authorized to perform this action",
        "You are not authorized to perform this action",
        400
      );
    }
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};

// sellor given permission staff
const permission = async (req, res) => {
  const sellorPermission = ({ Permissions } = req.body);
  let update;
  try {
    let user = await UserModel.findOne({ _id: req.body.userId });
    if (user) {
      const updatePermission = await UserModel.find({
        $and: [
          { _id: req.body.id },
          { Permissions: sellorPermission.Permissions },
        ],
      });
      if (updatePermission.length) {
        update = await UserModel.findByIdAndUpdate(
          { _id: req.body.id },
          {
            $pull: { Permissions: sellorPermission.Permissions },
          }
        );
      } else {
        update = await UserModel.findByIdAndUpdate(
          { _id: req.body.id },
          {
            $push: { Permissions: sellorPermission.Permissions },
          }
        );
      }
      res.status(200).json({ data: update });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(404).json({ message: error, status: "failure" });
  }
};

// create Staff
const createStaff = async (req, res) => {
  try {
    const result = createStaffValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
      let userObject = ({ name, number, email, password, role } = req.body);
      userObject = { ...userObject, userId: req.user._id };
      let newUser = await UserModel.create(userObject).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });

    // jwt authentication start
    let token = jwt.sign(
      { userID: newUser._id, role: newUser.role },
      process.env.SECRET_KEY
    );

    // send a response
    res.status(200).json({
      message: "staff created successfully",
      user: newUser,
      token: token,
      status: "success",
    });
  } catch (error) {
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = loginStaffValidation.validate(req.body);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    let user = await UserModel.findOne({ email }).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if (!user) {
      throw new CustomError("", "Invalid email", 400);
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        let token = jwt.sign(
          { userID: user._id, role: user.role },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          message: "Login successful",
          token: token,
          verifyStatus: user.verifyStatus,
          role: user.role,
        });
      } else {
        throw new CustomError(
          "Invalid login details",
          "Invalid login details",
          400
        );
      }
    }
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ message: error.message, status: "failure" });
  }
};

const generateAutoIncrementId = (currentNumericPart, currentAlphabeticPart) => {
  // Increment the numeric part

  currentNumericPart++;
  // Check if the numeric part has reached the limit
  if (currentNumericPart > 999999) {
    // Reset numeric part to 1
    currentNumericPart = 1;

    // Increment the alphabetic part
    currentAlphabeticPart = incrementAlphabeticPart(currentAlphabeticPart);
  }
  let id = `${currentAlphabeticPart}${currentNumericPart
    .toString()
    .padStart(6, "0")}`;

  return id;
};

const incrementAlphabeticPart = (alphabeticPart) => {
  // Convert alphabetic part to array of characters
  let chars = alphabeticPart.split("");

  // Increment the last character
  let lastChar = chars[1];
  if (lastChar === "Z") {
    // If last character is 'Z', reset to 'A' and increment the first character
    chars[1] = "A";
    chars[0] = incrementAlphabeticChar(chars[0]);
  } else {
    // Otherwise, just increment the last character
    chars[1] = incrementAlphabeticChar(lastChar);
    console.log("entered inside the else", chars[1]);
  }

  // Join the characters back into a string
  console.log("chars.join", chars.join(""));
  return chars.join("");
};

const incrementAlphabeticChar = (char) => {
  // Increment an alphabetic character
  let nextChar = String.fromCharCode(char.charCodeAt(0) + 1);
  return nextChar;
};




/*****************middleware**********************/

module.exports = {
  signupController,
  loginController,
  changePassword,
  sendEmailResetPassword,
  passwordUpdate,
  logout,
  deleteUser,
  profileUpdate,
  createStaff,
  loginStaff,
  permission,
};
