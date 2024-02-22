const express = require("express");
const {
    contactUs,
} = require("../controller/contactUsController");

const authUser = require("../middlewares/auth");

const router = express.Router();

router.post("/", contactUs);



module.exports = router;
