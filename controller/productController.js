const Product = require("../model/productModel");
const childCategoryModel =  require("../model/childCategoryModel");
const categoryModel = require("../model/categoryModel");
const subCategory = require("../model/subCategoryModel");
const { CustomError } = require("../errors/CustomErrorHandler");
const Inventory = require("../model/inventoryModel");

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
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({data:products});
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
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({data:product});
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
const createProduct = async (req, res) => {
  try {
    const productCreation = {
      product_title,
      product_image,
      selected_variant,
      product_description,
      min_order_quantity,
      child_category_id,
      category_id,
      subCategory_id,
      product_approved,
      brand_name,
      search_terms,
      HSN_code,
      minimum_order_quantity,
      product_tax_code,
      } = req.body;
      
    if(!product_title ){
      throw new CustomError(
        "",
        "Product title is required",
        400
      )
    }  
    else if(!product_description){
      throw new CustomError(
        "",
        "Product description is required",
        400
      )
    }
    else{
    const product = await Product.create(productCreation);
    const inventoryCreation = {productID:product._id,expiryDate,stock,sku,variantValuesCombo,price} = req.body
    const inventory = await Inventory.create(inventoryCreation)
    res.status(201).json({data:(productCreation,inventory)});
  }
    // }
  } catch (error) {
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
};

/**
 * It takes the id of the product to be updated from the request params, and the updated product data
 * from the request body, and then updates the product in the database with the new data, and returns
 * the updated product to the client.
 * @param req - The request object.
 * @param res - The response object.
 */
// To Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({data:product});
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
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: product,
      status: "success",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      status: "failure",
    });
  }
};

// post child category id in product to find child category
const ProductsChildCat =  async (req,res)=>{
  try{
    let id = req.body.id
    const productByChildCategory = await Product.find({child_category_id:id  });
    // console.log(product.child_category_id);
    res.status(200).json({
      status:"success",
      data:productByChildCategory
    })
  }catch(error){
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
}
 
// post category id in product to find category
const ProductsCat = async (req,res)=>{
  try{
    let id = req.body.id
    const productByCategory = await Product.find({category_id:id  });
    // console.log(product.child_category_id);
    res.status(200).json({
      status:"success",
      data:productByCategory
    })

  }catch(error){
    res.status(error.statusCode || 403).json({
      message: error.message,
      status: "failure",
    });
  }
}

// post sub category id in product to find subcategory category
const ProductsSubCat = async (req,res)=>{
  try{
    let id = req.body.id
    const productBySubCategory = await Product.find({subCategory_id:id});
    // console.log(product.child_category_id);
    res.status(200).json({
      status:"success",
      data:productBySubCategory
    })
  }catch(error){
    res.status(error.statusCode).json({
      message: error.message,
      status: "failure",
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  ProductsChildCat,
  ProductsCat,
  ProductsSubCat,
};
