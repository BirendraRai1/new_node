const Description = require("../model/descriptionTypeModel")

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
const getDescription = async (req, res) => {
  try {
    const descriptionData = await Description.find();
    res.status(200).json({data:descriptionData});
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
const getSingleDescription = async (req, res) => {
  try {
    const descriptionData = await Description.findById(req.params.id);
    res.status(200).json({data:descriptionData,status:"success"});
  } catch (error) {
    res.status(error.statusCode || 404).json({
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
const createDescription = async (req, res) => {
  try {
    const descriptionData ={description_name,value,user_id} =  req.body;
    const discData = await Description.create(descriptionData);
    res.status(201).json({data:discData,status:"success"});
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
const updateDescription = async (req, res) => {
  try {
    const descriptionData = await Description.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({data:descriptionData});
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
const deleteDescription = async (req, res) => {
  try {
    const descriptionData = await Description.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: descriptionData,
      status: "success",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      status: "failure",
    });
  }
};

module.exports = {
  getDescription,
  getSingleDescription,
  createDescription,
  updateDescription,
  deleteDescription
};
