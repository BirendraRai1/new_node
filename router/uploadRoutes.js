const express = require("express");
const {
    fileUpload,
} = require("../controller/uploadFileController");

const authUser = require("../middlewares/auth");

const router = express.Router();

router.post("/", fileUpload);



module.exports = router;
