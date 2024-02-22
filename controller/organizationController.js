/******all the required imports are in the same file***/
const organizationModel = require("../model/organizationModel");
const UserModel = require("../model/userModel");
const { CustomError } = require("../errors/CustomErrorHandler");
var mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const {GST_API , GST_API_KEY} = process.env;

//TO create organization data
const createOrganizationController = async function (req, res) {
  try {
    const organizationObject = req.body;
    //   data -> req.body
    // const { companyName, registeredCompanyName } = organizationObject;
    let newOrganization = await organizationModel.create(organizationObject);
    let objectId = new mongoose.Types.ObjectId(newOrganization._id)
    let user = await UserModel.updateOne(
        { _id : req.user._id},
        { $set: { "companyID" : objectId} }
     );

    // send a response
    res.status(201).json({
      data: user,
      status: "success",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To upload bank details
const addAccountDetail = async function(req,res){
  try{
    const update = {accountNumber,ifscCode,bankName,cancelCheque} = req.body
    let user = await UserModel.findOne({ _id: req.user._id});
    if(user){
         if(user.companyID){
          let data = await organizationModel.findOneAndUpdate({_id:user.companyID}, update,{
          new:true
          });
          res.status(200).json({ message: "Banking details successfully added", data});   
         }else{
          throw new CustomError(
            "",
            "Organization not found",
            404
          );
         }
    }else{
      throw new CustomError(
        "",
        "User Not Found",
        404
      );
    }
  }catch(error){
    res.status(error.statusCode).json({ message: error.message,status:"failure"});
  }
}

// TO Update Organisation Details

const updateOrganizationDetails = async function (req,res){
  try{
    const update = req.body;
    let user = await UserModel.findOne({ _id: req.user._id});
    if(user){
         if(user.companyID && !user.varifyStatus){
          let orgUpdate =  await organizationModel.findOneAndUpdate({_id:user.companyID}, update,{
          new:true
          });
          res.status(200).json({ data: orgUpdate });   
         }else{
          throw new CustomError(
            "",
            "Organization not found",
            403
          );
         }
    }else{
      throw new CustomError(
        "",
        "User Not Found",
        404
      );
    }
  }catch(error){
    res.status(error.statusCode).json({ message: error.message , status:"failure" });
  }
}

// gst confirmation api

const getGSTValue = async function(req,res){
  try{
   let gstNumber = req.body.gstNumber;
   let api_key = GST_API_KEY;
   console.log(gstNumber , "gst number" , api_key);
   console.log(`${GST_API}=${gstNumber}&apikey=${api_key}`)
   let response_data = await fetch(`${GST_API}=${gstNumber}&apikey=${api_key}`);
   let data = await response_data.json();
  const {gstin , name ,tradename , state, pradr} = data
   let response = {gstin , name , tradename , state , pradr}
   res.status(200).json({ data:response , status:"success"});
  }catch(error){
    res.status(error.statusCode || 401 ).json({ message: error.message,status:"failure"});
  }
}





/*****************middleware**********************/

module.exports = {
  createOrganizationController,
  addAccountDetail,
  updateOrganizationDetails,
  getGSTValue
};
