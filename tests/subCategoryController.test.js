const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

let subCatId;
describe("POST /api/subCategory", () => {
  it("should create a subCategory", async () => {
    const res = await request(app).post("/api/subCategory/").send({
      sub_category_type : "Cleaning_Essentials",
      isActive: true,
      updated_By:  "65c07170dc158ea897839441",
      category_id: "65c083725361349ec7f1592a",
      variant_id: "65cc63a965d993c0cfc257e5",
    }
    );
    subCatId = res.body.data._id;
    expect(res.statusCode).toBe(201);
  });
});

/* Testing the API endpoints. */
// describe("GET /api/subCategory", () => {
//   it("should return all subCategory", async () => {
//     const res = await request(app).get("/api/subCategory");
//     expect(res.statusCode).toBe(200);
//   });
// });

describe("GET /api/subCategory/:id", () => {
  it("should return a subCategory", async () => {
    const res = await request(app).get(
      `/api/subCategory/${subCatId}`
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("PUT /api/subCategory/:id", () => {
  it("should update a subCategory", async () => {
    const res = await request(app)
      .patch(`/api/subCategory/${subCatId}`)
      .send({
        updated_By:"65c07170dc158ea897839441",  
        sub_category_type : "Cleaning Essentials"
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/subCategory/:id", () => {
  it("should delete a subCategory", async () => {
    const res = await request(app).delete(`/api/subCategory/${subCatId}`)
    expect(res.statusCode).toBe(200);
  });
});
