const subCategory = require("../model/subCategoryModel");
const { CustomError } = require("../errors/CustomErrorHandler");
const ChildCategory = require("../model/childCategoryModel");
const { getSubCategoryAndVariantValidation ,createSubCategoryValidation } = require("../validation/subCategoryValidation");
// const mongoose = require("mongoose");
//for given subCategory id get the variant and subCategory
const getSubCategoryAndVariant = async (req, res) => {
  try {
    let userObject = req.body;
    const result = getSubCategoryAndVariantValidation.validate(userObject);
    if(result.error){
       throw new CustomError(result.error.message, result.error.message, 403)
    }
    let subCategoryAndVariant = await subCategory
      .findOne({
        _id: req.body.subCategoryId,
      })
      .populate({ path:"variant_id", populate: ["_id"]});
    let childCat = await ChildCategory.find({
      sub_category_id: req.body.subCategoryId,
    });
    subCategoryAndVariant = { subCategoryAndVariant, childCat };
    if(subCategoryAndVariant){
      console.log("object")
    }
    res.status(200).json({
      status: "success",
      data: (subCategoryAndVariant.subCategoryAndVariant !== null)?subCategoryAndVariant:"Subcategory Data Not Found!",
    });
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


// To Get Only One Sub Category
const getAllSub = async (req, res) => {
  try {
    const subCat = await subCategory.find({}).populate({ path: "variant_id", populate: ["_id"] });
    res.status(200).json({data:subCat.length>0?subCat:"No Data Found!"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};



// To Get Only One Sub Category
const getSubSingle = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = getSubSingleValidataion.validate(userId);
    if(result.error){
       throw new CustomError(result.error.message, result.error.message, 403)
    }
    const subCat = await subCategory.findById(req.params.id).populate({ path: "variant_id", populate: ["_id"] }).catch(
      (e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      }
    );
    res.status(200).json({data:subCat?subCat:"No Data Found"});
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
 *
 */

// To Create Sub Category
const createSubCategory = async (req, res) => {
  try {
    let subCategories = {
      category_id,
      variant_id,
      sub_category_type,
      updated_By,
    } = req.body;
    if(!updated_By){
      subCategories.updated_By = "65c07170dc158ea897839441"
    }
    const result = createSubCategoryValidation.validate(subCategories);
    if (result.error)
      throw new CustomError(result.error.message, result.error.message, 403);

    const subCat = await subCategory.create(subCategories);
    res.status(201).json({data:subCat});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To Update Sub Category and time Stamp
const updateSub = async (req, res) => {
  try {
    let updateRequired = {category_id,
      variant_id,
      sub_category_type,
      updated_By} = req.body;
    const subCat1 = await subCategory.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          "sub_category_type" : req.body.sub_category_type,
          "variant_id" : req.body.variant_id,
          "category_id" : req.body.category_id,
          "updated_By" : req.body.updated_By
        },
      },
      {
        new: true,
      }
    ).catch(
      (e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      }
    );
    res.status(200).json({
      status: "success",
      data: subCat1?subCat1:"No Data Found",
    });
  } catch (error) {
    // console.log("error is", error);
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

// To Delete Only One Sub Category
const deleteSub = async (req, res) => {
  try {
    const deleteId = req.params.id;
    const subCat = await subCategory.findByIdAndDelete(deleteId).catch(
      (e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      }
    );
    res.status(200).json({data:subCat?subCat:"No Data Found"});
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
};


//  Sub Category and Child Category as a tree Structure
const getSubCategoryChildCategory = async function (req, res) {
  try {
      let subCategoryData = await subCategory.find({}).populate({ path: "variant_id", populate: ["_id"] }).catch(
        (e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        }
      );
      for (let j = 0; j < subCategoryData.length; j++) {
        let childCategoryData = await ChildCategory.find(
          {
            sub_category_id: subCategoryData[j]._id,
          },
          { updated_By: 0 }
        )
        //console.log("childCategoryData is ", childCategoryData);
        subCategoryData[j] = {
          ...subCategoryData[j]._doc,
          childCategoryData,
        };
        // console.log("subCategoryData is ", subCategoryData);
      }
    res.status(200).json({
      status: "success",
      data: subCategoryData.subCategoryData?subCategoryData:"No Data Found",
    });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message , status:"failure" });
  }
};

module.exports = {
  getSubCategoryAndVariant,
  getSubSingle,
  createSubCategory,
  updateSub,
  deleteSub,
  getAllSub,
  getSubCategoryChildCategory
};
