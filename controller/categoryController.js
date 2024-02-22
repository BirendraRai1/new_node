const categoryModel = require("../model/categoryModel");

const subCategory = require("../model/subCategoryModel");

const childCategoryModel = require("../model/childCategoryModel");

const {postCategoryValidation,
  updatecategoryValidation,}  =  require("../validation/categoryValidation");

const { CustomError } = require("../errors/CustomErrorHandler");

// To Post Category 
const postCategory = async function (req, res) {
  try {
    const element = ({ category_type, isActive, updated_By } = req.body);
    const result = postCategoryValidation.validate(element);
    if(result.error)
    throw new CustomError(result.error.message, result.error.message, 403);
    let cate_gory = await categoryModel.findOne({ category_type}).catch((e) => {
      throw new CustomError(e.message, "Database Call Failed", 500);
    });
    if(cate_gory){
      throw new CustomError("", "Category Already Exist", 403);
    }else{
      const category = await categoryModel.create(element);
      res.status(200).json({message:"Category Created Successfully", data:category});
    }
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message, status:"failure" });
  }
};


// to get all category, Sub Category and Child Category as a tree Structure
const getCategorySubCategoryChildCategory = async function (req, res) {
  try {
    let categoryData = await categoryModel.find({}, { updated_By: 0 }).catch(()=>{
       throw new CustomError(e.message, "Database Call Failed", 500);
    });
    for (let i = 0; i < categoryData.length; i++) {
      let subCategoryData = await subCategory.find(
        {
          category_id: categoryData[i]._id,
        },
        { updated_By: 0 }
      ).populate("variant_id.variantID").catch(()=>{
        throw new CustomError(e.message, "Database Call Failed", 500);
     });
      for (let j = 0; j < subCategoryData.length; j++) {
        let childCategoryData = await childCategoryModel.find(
          {
            sub_category_id: subCategoryData[j]._id,
          },
          { updated_By: 0 }
        ).catch(()=>{
          throw new CustomError(e.message, "Database Call Failed", 500);
       });
        //console.log("childCategoryData is ", childCategoryData);
        subCategoryData[j] = {
          ...subCategoryData[j]._doc,
          childCategoryData,
        };
        //console.log("subCategoryData is ", subCategoryData[i]);
      }
      //categoryData[i]["subCategoryData"] = subCategoryData;
      categoryData[i] = { ...categoryData[i]._doc, subCategoryData };
    }
    res.status(200).json({
      status: "success",
      data: categoryData,
    });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message , status:"failure" });
  }
};

// To get Only One Category by Id
const getSingleCategory = async function (req, res) {
  try {
    let id = req.params.id;
    let foundCategory = await categoryModel.findOne({ _id: id });
    res.status(200).json({data:foundCategory});
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message ,status:"failure" });
  }
};

// update Only One Category by Id
const updatecategory = async (req, res) => {
  try {
    const element = ({ category_type, isActive, updated_By } = req.body);
    const result = updatecategoryValidation.validate(element);
    if(result.error){
      throw new CustomError(result.error.message, result.error.message, 403);
    }else{
      const category_Data = await categoryModel.findOneAndUpdate( { _id: req.params.id }, {
        $set: {
          ...element,
        },
      }).catch((e) => {
        throw new CustomError(e.message, "Database Call Failed", 500);
      });
      res.status(200).json({ message: "Updated Successfully"});
    }
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message, status:"failure" });}
};

// Deleting only one category by id
const deleteCategory = async function (req, res) {
  try {
    const deletecategory = await categoryModel.findByIdAndDelete(req.params.id).catch((e)=>{
      throw new CustomError(e.message, "Database Call Failed", 500);
    })
    res.status(200).json({data:deletecategory, message:"Deleted Successfully"})
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message ,status:"failure" });
  }
};

module.exports = {
  postCategory,
  getCategorySubCategoryChildCategory,
  updatecategory,
  deleteCategory,
  getSingleCategory,
};
