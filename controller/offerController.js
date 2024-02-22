
const { CustomError } = require("../errors/CustomErrorHandler");
const Inventory = require("../model/inventoryModel");
const path = require('path')
const fs = require('fs');
const Offer = require("../model/offerModel")

var jwt = require("jsonwebtoken");
require("dotenv").config();

const uploadFile = require("../helpers/uploadFile")

// get Offer
const getOffer = async (req, res) => {
  try {
    const offerData = await Offer.find({});
    res.status(200).json({data:offerData});
  } catch (error) {
    res.status(error.statusCode || 404).json({
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
const getSingleOffer = async (req, res) => {
  try {
    const offerData = await Offer.findById(req.params.id);
    res.status(200).json({data:offerData});
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
const createOffer = async (req, res) => {
  try {
    const branLogoFile = req.files.brand_logo;
    const brandDocumentFile = req.files.brand_document;

    const brandLogoPath = uploadFile(branLogoFile)
    const brandDocPath = uploadFile(brandDocumentFile)
    var jwt = require("jsonwebtoken");
    const { authorization } = req.headers;
    let token = authorization.split(" ")[1];
    const { userID } = jwt.verify(token, process.env.SECRET_KEY);

  } catch (error) {
    res.status(error.statusCode || 404).json({
      message: error.message,
      status: "failure",
    });
  }
};

// To Update
const updateOffer = async (req, res) => {
  try {
    const offerData = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({data:offerData});
  } catch (error) {
    res.status(error.statusCode || 404).json({
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
const deleteOffer = async (req, res) => {
  try {
    const offerData = await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({data:offerData});
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failure",
    });
  }
};


module.exports = {
    getOffer,
    getSingleOffer,
    createOffer,
    updateOffer,
    deleteOffer,
};
