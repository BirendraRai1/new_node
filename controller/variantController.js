const variantData = require("../model/variantModel");
const Product = require("../model/productModel");
const { CustomError } = require("../errors/CustomErrorHandler");
// TO get Variant Data
const getVariant = async (req, res) => {
  try {
    const unitCat = await variantData.find({});
    res.status(200).json({data:unitCat.length>0?unitCat:"No Data found"});
  } catch (error) {
    res.status(error.statusCode ||404).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * @param req - The request object.
 * @param res - The response object.
 */

// To Get Single Variant
const getSingleVariant = async (req, res) => {
  try {
    const unitCat = await variantData.findById(req.params.id);
    res.status(200).json({data:unitCat});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * response.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

// To Create Variant
const createVariant = async (req, res) => {
  try {
    const varientCreate = {name , updated_By} = req.body;
    const unitCat = await variantData.create(varientCreate);
    res.status(201).json({data:unitCat,status:"success"});
  } catch (error) {
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * @param req - The request object.
 * @param res - The response object.
 */

//To Update Variant
const updateVariant = async (req, res) => {
  try {
    let updateRequired = {} = req.body;
    let updateValue = await variantData.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
             "name" : req.body.name
        },
        updated_By:req.user
      },
      {
        new: true,
      }
    );
    //console.log("subCat4 is", subCat4);
    res.status(200).json({
      status: "success",
      data: updateValue,
    });
  } catch (error) {
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

// To Delete Variant
const deleteVariant = async (req, res) => {
  try {
    const unitCat = await variantData.findByIdAndDelete(req.params.id);
    if(unitCat){
      res.status(200).json({data:unitCat,status:"success"});
    }else{
      throw new CustomError("", "No data found", 403);
    }
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  getVariant,
  getSingleVariant,
  createVariant,
  updateVariant,
  deleteVariant,
};
