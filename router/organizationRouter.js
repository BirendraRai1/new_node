const express = require("express");

const authUser = require("../middlewares/auth");

const {
    createOrganizationController,
    addAccountDetail,
    updateOrganizationDetails,
    getGSTValue
} = require("../controller/organizationController");

const router = express.Router();

/* Creating the routes for the product controller. */

router.post("/gst",getGSTValue);

router.post("/",authUser, createOrganizationController);

router.post("/addaccountdetail",authUser, addAccountDetail);
router.patch("/updateaccountdetails",authUser, updateOrganizationDetails);

module.exports = router;
