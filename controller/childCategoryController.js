const childCategoryModel =  require("../model/childCategoryModel")
const { CustomError } = require("../errors/CustomErrorHandler");
const { getSubCategoryAndVariant } = require("./subCategoryController");
const subCategoryModel = require("../model/subCategoryModel");
const {postChildCategoryValidation,updatecategoryValidation} = require("../validation/childCategoryValidation");

// To Post Child Categoy Only

const postChildCategory = async function(req,res){
   try{
        const element = {child_category_type,isActive,sub_category_id,updated_By} = req.body;
        const result = postChildCategoryValidation.validate(element);
        if(result.error)
        throw new CustomError(result.error.message, result.error.message, 403);
        let child_cate_gory = await childCategoryModel.findOne({ child_category_type, sub_category_id}).catch((e) => {
          throw new CustomError(e.message, "Database Call Failed", 500);
        });
        if(child_cate_gory){
          throw new CustomError("", "Child Category Already Exist", 403);
        }else{
          const childcategory = await childCategoryModel.create(element);
          res.status(200).json({message:"Child Category Created Successfully", data:childcategory});
        }
   }catch(error){
        res.status(error.statusCode).json({message : error.message})
   }
}


// To Get All Child Category Only
const getAllChildCategory = async function(req,res){
  // console.log("hello")
    try{
       const getall_childcategory = await childCategoryModel.find();
       res.status(200).json({data:getall_childcategory});
    }catch(error){
       res.status(error.statusCode).json({message: error.message});
    }
}

// To get only one Child Category By Id
const getChildcategoryByID = async function(req,res){
    try{
      const getchildCategory_byId = await childCategoryModel.findById({_id:req.params.id});
      res.status(200).json({data:getchildCategory_byId});
    }catch(error){
       res.status(error.statusCode).json({message : error.message ,status:"failure"});
    }
}


// To get only one Child Category By Id
const getChildData = async function(req,res){
  try{
    const getchildCategory_byId = await childCategoryModel.find({sub_category_id:req.body.id});
    res.status(200).json({ data : getchildCategory_byId.length > 0 ? getchildCategory_byId : "No data found!",status:"success"});
  }catch(error){
     res.status(error.statusCode || 404).json({message : error.message ,status:"failure"});
  }
}


// update child category data
const updateChildcategory = async (req, res) => {
    try {
        let element = ({child_category_type,isActive,sub_category_id,updated_By} =  req.body)
        const result = updatecategoryValidation.validate(element);
        if(result.error){
          throw new CustomError(result.error.message, result.error.message, 403);
        }else{
          const child_category_Data = await childCategoryModel.findOneAndUpdate( { _id: req.params.id }, {
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


  // Delte Only One Child Category By Id
const deleteChildCategory = async function(req,res){
    try{
       const deleteChildcategory = await childCategoryModel.findByIdAndDelete(req.params.id);
       res.status(200).json({data:deleteChildcategory})
    }catch(error){
       res.status(error.statusCode).json({message : error.message,status:"failure"});
    }
}

const createMultiChildCategory = async function(req,res){
  // console.log("Hello")
  try{
       const element =  req.body;
       if(element){
           const childcategory = await childCategoryModel.insertMany(element);
           res.status(200).json({data:childcategory});
       }else{
         throw new CustomError(
           "",
           "All fields Should be Filled",
           500
         );
       }
  }catch(error){
     res.status(error.statusCode || 403).json({message : error.message})
  }
}


module.exports = {
    postChildCategory,
    getAllChildCategory,
    getChildcategoryByID,
    updateChildcategory,
    deleteChildCategory,
    createMultiChildCategory,
    getChildData
}





