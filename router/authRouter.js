const express = require("express");
const {
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
} = require("../controller/authController");
const authUser = require("../middlewares/auth");
const { restrict, restrictAll } = require("../middlewares/restrict");

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/resetPassword", sendEmailResetPassword);

router.delete("/deleteuser/:id", deleteUser);

router.post("/:id/:token", passwordUpdate);

router.post("/permission", authUser, permission);

router.post("/logout", authUser, logout);

router.post("/changePassword", authUser, changePassword);

router.patch("/profile_update/:id", authUser, profileUpdate);

// Staff create then login
router.post("/staffLogin", loginStaff);

router.get(
  "/allData",
  authUser,
  restrict("Staff"),
  restrictAll("Create", "Update"),
  (req, res) => {
    res.status(200).json({ message: "Hello world" });
  }
);

router.post("/staff", authUser, createStaff);

module.exports = router;
