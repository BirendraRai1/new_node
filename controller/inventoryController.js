const Inventory = require("../model/inventoryModel");
const { CustomError } = require("../errors/CustomErrorHandler");
// To Get All Inventory
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({data:inventory});
  } catch (error) {
    res.status(404).json({message:error.message,status:"failure"});
  }
};

/**
 * @param req - The request object.
 * @param res - The response object.
 */

// To Get Single Inventory
const getSingleInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    res.status(200).json({data:inventory});
  } catch (error) {
    res.status(error.statusCode || 404).json({message:error,status:"failure"});
  }
};

/**
 * response.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

// const createInventory = async (req, res) => {
//   try {
//     const inventory = await Inventory.create(req.body);
//     res.status(201).json(inventory);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// To Update Inventory
const updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (inventory == null){
      throw new CustomError(
        "",
        "The invetory is not valid",
        403
      );
    } 
    else {
       res.status(200).json({
         status: "success",
         data: inventory,
       });
    }
  } catch (error) {
    res.status(error.statusCode).json({
      status: "failure",
      message: error.message,
    });
  }
};

/**
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

// TO Delete Inventory
const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({data:inventory});
  } catch (error) {
    res.status(error.statusCode || 404).json({message:error,status:"failure"});
  }
};

module.exports = {
  getInventory,
  getSingleInventory,
//   createInventory,
  updateInventory,
  deleteInventory,
};
