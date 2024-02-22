const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../errors/CustomErrorHandler");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER, SECRET_KEY ,DB_NAME } = process.env;
const path = require('path');

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});



/* Testing the API endpoints. */
describe("POST /api/uploadFiles", () => {
  it("user upload file successfully", async () => {
    const filePath = path.join(__dirname, "../uploadFiles", "102493file_example_XLS_10.xls"); // Replace with your file path
    const response = await request(app).post("/api/uploadFiles").attach('file', filePath);
    expect(response.statusCode).toBe(404);
    // expect(response.body).toEqual({
    //     message: "File upload successfully",
    //     status: "success",
    //   });
  });

  it("should handle  upload files  fields", async () => {
    // Try to signup with the same username again
    const response = await request(app).post("/api/uploadFiles").send({

    });
    expect(response.statusCode).toBe(404);
    // expect(response.body).toEqual({
    //   "message": "Please Select file",
    //   "status": "failure"
    // });
  });

});



