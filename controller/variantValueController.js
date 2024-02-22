const variantData = require("../model/variantValuesModel");
const { CustomError } = require("../errors/CustomErrorHandler");
//  TO Get All Variant Value
const getVariantValue = async (req, res) => {
  try {
    const unitCat = await variantData.find();
    res.status(200).json({data:unitCat});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * @param req - The request object.
 * @param res - The response object.
 */
// To Get Single Variant Value
const getSingleVariantValue = async (req, res) => {
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
// To Create Variant Value
const createVariantValue = async (req, res) => {
  try {
    let varintValue = {value,colorCode,updated_By} = req.body
    if(value){
      const unitCat = await variantData.create(varintValue);
      res.status(201).json({data:unitCat});
    }
    else{
      throw new CustomError("", "Please fill the value", 403);
    }
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * @param req - The request object.
 * @param res - The response object.
 */

// To send  Variant from Backend to front end
const postVariantvalue = async (req,res)=>{ 
  try {
     const data = await variantData.find({variant_id: req.body.variant_id }).populate("variant_id","name");
     if(!data){
      throw new CustomError(
        "",
        "The unit field does not exist",
        404
      );
     }else{
      res.status(200).json({data:data.map(d=>({"variant_id":d.variant_id,"value":d.value,"colorCode":d.colorCode,"name":d.name}))});
     }
  }catch(error){
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
  }

// To Update Variant value
const updateVariantValue = async (req, res) => {
  try {
    let values = req.body.value;
    // console.log(values);
    const unit1 = await variantData.findByIdAndUpdate(
      { _id: req.params.id},
      {
        $Set: { value: values },
        updated_By:req.user
      },
      { upsert: true }
    );
    res.status(200).json({
      status: "success",
      data: unit1,
    });
  } catch (error) {
    res.status(error.statusCode).json({
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

// To Delete Variant Value
const deleteVariantValue = async (req, res) => {
  try {
    const unitCat = await variantData.findByIdAndDelete(req.params.id);
    res.status(200).json({data:unitCat});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  getVariantValue,
  getSingleVariantValue,
  createVariantValue,
  updateVariantValue,
  deleteVariantValue,
  postVariantvalue
};
