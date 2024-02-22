const express = require("express");
const authUser = require("../middlewares/auth");
const router = express.Router();

const {
   getAllOrganisationDetails
} = require("../controller/adminController");


router.get("/getAllOrganisationDetails", getAllOrganisationDetails);

module.exports = router