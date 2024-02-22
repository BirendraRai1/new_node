const { brand, brand_relations } = require("../model/brandModel");
const { CustomError } = require("../errors/CustomErrorHandler");

const uploadFile = require("../helpers/uploadFile");

const jwt = require("jsonwebtoken");
const { brandRelationValidation, brandValidation } = require("../validation/brandValidation");
require("dotenv").config();
/**
 * It's an asynchronous function that uses the await keyword to wait for the result of the find()
 * method on the Product model.
 *
 * The find() method returns a promise, which is why we can use the await keyword.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
// To Get All Product
const getAllBrands = async (req, res) => {
  try {
    const brandData = await brand
      .find({})
      .populate("brand_relation")
      .populate("admin_id", "name email")
      .populate("vender_id", "name email")
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res
      .status(200)
      .json({ data: brandData.length > 0 ? brandData : "Brand List is empty" });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// get venter brands
const getVendorBrand = async (req, res) => {
  try {
    const brandData = await brand
      .find({ vender_id: req.user.id })
      .populate("brand_relation")
      .populate("admin_id", "name email")
      .populate("vender_id", "name email")
      .populate({ path: "subcategory_id", populate: ["_id","variant_id"] }).catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res.status(200).json({
      data: brandData.length > 0 ? brandData : "You does not have your brand",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// get venter brands
const getVendorBrandVerify = async (req, res) => {
  try {
    const brandData = await brand
      .find({ vender_id: req.user.id, is_verify: true })
      .populate("brand_relation")
      .populate("admin_id", "name email")
      .populate("vender_id", "name email")
      .populate({ path: "subcategory_id", populate: ["_id","variant_id"] })
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res.status(200).json({
      data: brandData.length > 0 ? brandData : "Verify brands not found!",
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * It's an asynchronous function that uses the Product model to find a product by its id, and then
 * sends a response with the product's data.
 * @param req - The request object.
 * @param res - The response object.
 */

// To GET Only One Product By ID
const getSingleBrand = async (req, res) => {
  try {
    const brandData = await brand.findById(req.params.id).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    res.status(200).json({ data: brandData?brandData:"No Data Found"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * It creates a new product using the data from the request body and returns the created product in the
 * response.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
// To Create Product
const createBrand = async (req, res) => {
  try {
    const brandLogo = req.files.brand_logo;
    const brandDocumentFile = req.files.brand_document;
    let brandCreation = ({ brand_name, brand_relation } = req.body);
    let subcategory_id = JSON.parse(req.body.subcategory_id);
   
    const result = brandValidation.validate(brandCreation,brandLogo,brandDocumentFile,subcategory_id);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);


    const brandLogoPath = uploadFile(brandLogo);
    const brandDocPath = uploadFile(brandDocumentFile);

    let exist_brand = await brand
      .findOne({
        vender_id: req.user._id,
        brand_name: brand_name,
      })
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    if (!exist_brand) {
      const brandData = await brand
        .create({
          ...brandCreation,
          brand_logo: brandLogoPath,
          brand_document: brandDocPath,
          vender_id: req.user._id,
          admin_id: "65c07170dc158ea897839441",
          subcategory_id: subcategory_id,
        })
        .catch((e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        });
      res.status(200).json({ data: brandData });
    } else {
      throw new CustomError("", "Brand Name Already Exist", 403);
    }

    // }
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To Update
const updateBrand = async (req, res) => {
  try {
    let brandLogoPath;
    let brandDocPath
    let branLogoFile
    let brandDocumentFile
    const {brand_name, brand_relation} = req.body
    let subcategory_id = JSON.parse(req.body.subcategory_id);
    let data = {brand_name,brand_relation,subcategory_id}
    if(req.files){
     branLogoFile = req.files.brand_logo;
     brandDocumentFile = req.files.brand_document;
    }
    if(branLogoFile){
       brandLogoPath = uploadFile(branLogoFile);
       data["brand_logo"] = brandLogoPath
    }
    if(brandDocumentFile){
      brandDocPath = uploadFile(brandDocumentFile);
      data["brand_document"] = brandDocPath
    }
    const brandData = await brand.findByIdAndUpdate(req.params.id,data, 
    {
      new: true,
    }) 
    .catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });

    res.status(200).json({ data:brandData?brandData:"No data found"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * It finds a product by its id and deletes it.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

// TO Delete Produt
const deleteBrand = async (req, res) => {
  try {
    const brandData = await brand
      .findByIdAndDelete(req.params.id)
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res.status(200).json({ data: brandData?brandData:"No Data Found" });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// brand relation function  get
const getAllBrandRelation = async (req, res) => {
  try {
    const brandData = await brand_relations.find({}).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    res.status(200).json({ data: brandData.length>0?brandData:"No Data Found"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// brand relation function create
const createBrandRelation = async (req, res) => {
  try {
    const brandCreation = req.body;
    const result = brandRelationValidation.validate(brandCreation);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);

    const brandData = await brand_relations.create(brandCreation).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    res.status(200).json({ data: brandData,status:"success"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To Update
const updateBrandRelation = async (req, res) => {
  try {
    const brandCreation = req.body;
    const result = brandRelationValidation.validate(brandCreation);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);
    const brandData = await brand_relations
      .findByIdAndUpdate(req.params.id, brandCreation, {
        new: true,
      })
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res.status(200).json({ data: brandData?brandData:"No Data Found" });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To Delete brand relation
const deleteBrandRelation = async (req, res) => {
  try {
    const brandData = await brand_relations
      .findByIdAndDelete(req.params.id)
      .catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
    res.status(200).json({ message: brandData?brandData:"No Data Found", status: "success" });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  getAllBrands,
  getSingleBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrandRelation,
  createBrandRelation,
  updateBrandRelation,
  deleteBrandRelation,
  getVendorBrand,
  getVendorBrandVerify,
};
