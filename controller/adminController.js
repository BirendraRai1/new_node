const organizationModel = require("../model/organizationModel");
const { CustomError } = require("../errors/CustomErrorHandler");
// To Get All Organisation detail
const getAllOrganisationDetails = async function(req,res){
    try{
       const AllOrganisationDetails = await organizationModel.find({});
       if(AllOrganisationDetails.length>0){
        res.status(200).json({data:AllOrganisationDetails });
       }else{
        throw new CustomError(
          "",
          "No Data found",
          404
        );
       }
    }catch(error){
      res.status(error.statusCode).json({ message: error.message,status:"failure" });
    }
  }
  
module.exports = {
    getAllOrganisationDetails
  };




