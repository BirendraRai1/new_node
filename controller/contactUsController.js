/******all the required imports are in the same file***/
const contactModel = require("../model/contactusModel");
const { CustomError } = require("../errors/CustomErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// contact us form to store user details 
const contactUs = async function (req, res) {
  try {
    // add it to the db
    const userObject = req.body;
    //   data -> req.body
    const { name, phone,email,companyName,message,userType } = userObject;
    if(name && phone && email && companyName && message && userType){
        let newUser = await contactModel.create(userObject);
        res.status(201).json({
            data: newUser,
            status: "success",
          });
    }else{
      throw new CustomError(
        "",
        "All fields are requires",
        400
      );
    }
    
  } catch (error) {
    res.status(error.statusCode || 400).json({
      message: error.message,
      status: "failure",
    });
  }
};

/*****************middleware**********************/

module.exports = {
    contactUs,
};
