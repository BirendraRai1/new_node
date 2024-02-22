const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER , DB_NAME } = process.env;

let brandLogo = `${__dirname}/uploadFiles/164821e-Commerce Database.jpg`
let brandDocu = `${__dirname}/uploadFiles/194340registration_form.png`


const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let brandId;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe("GET /api/brand", () => {
  it("should return all brand", async () => {
    const res = await request(app).get("/api/brand");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/brand/:id", () => {
  it("should return a brand", async () => {
    const res = await request(app).get("/api/brand/65a565d5f8e4b5b1b6ebb9b5");
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/brand", () => {
  it("should create a brand", async () => {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE4ZDdjZDAyNmZmMTAwMTQwMDQ3OTkiLCJpYXQiOjE3MDc3Mzk4OTZ9.V4y-AN2Dcf-Ttf0NcNqYi1Pqcw1sDJFVxO4cz_RtS9I"
    const logo = {
      fieldname: 'brand_logo',
      originalname: '188058logo.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: Buffer.from([/* file content */]), // Provide file content as buffer
      size: 12345 // Provide file size
    };

    const docu = {
      fieldname: 'brand_logo',
      originalname: '188058logo.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer: Buffer.from([/* file content */]), // Provide file content as buffer
      size: 12345 // Provide file size
    };
    const res = await request(app).post("/api/brand").set("Authorization", `Bearer ${authToken}`)
    .attach('brand_logo', logo.buffer, '188058logo.jpg')
    .field('brand_name', 'Galaxy')
    .field('is_verify', 'true')
    .field('brand_relation', '65c07170dc158ea897839441')
    .field('brand_document', docu.buffer, '188058logo.jpg')
    .field('subcategory_id',"[\"65c07170dc158ea897839441\"]");
    brandId = res.body.data._id;
    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /api/brand/:id", () => {
  it("should update a Brand", async () => {
    const res = await request(app)
      .patch(`/api/brand/${brandId}`)
      .send({
        brand_name:"JIRA"
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/brand/:id", () => {
  it("should delete a brand", async () => {
    const res = await request(app).delete(`/api/brand/${brandId}`);
    expect(res.statusCode).toBe(200);
  });
});
