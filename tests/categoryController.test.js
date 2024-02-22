const mongoose = require("mongoose");
const { CustomError } = require("../errors/CustomErrorHandler");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER , DB_NAME } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let category_Id;


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});




describe("POST /api/category", () => {
    it("should create a Category", async () => {
      const res = await request(app).post("/api/category").send({
        category_type: "ElV4",
        isActive: true,
        updated_By: "65a6606da3c72f64de86f087"
    });
      category_Id = res.body.data._id;
      expect(res.statusCode).toBe(200);
    });
    it("should Not create a Category", async () => {
        const res = await request(app).post("/api/category").send({
         
      });
        expect(res.statusCode).toBe(403);
      });
  });

  describe("GET /api/category", () => {
    it("should get categories with subcategories and child categories", async () => {
      const res = await request(app).get("/api/category");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
    });
  });

  describe("GET /api/category/:id", () => {
    it("should return One Category by Id", async () => {
      const res = await request(app).get("/api/category/65ae3ae15e2834a9b18ea855");
      expect(res.statusCode).toBe(200);
    });
  });


  describe("PUT /api/category/:id", () => {
    it("should update a Category", async () => {
      const res = await request(app)
        .patch(`/api/category/${category_Id}`)
        .send({
          updated_By:"65a565d5f8e4b5b1b6ebb9b5",
         });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE /api/category/:id", () => {
    it("should delete a Category", async () => {
      const res = await request(app).delete(`/api/category/${category_Id}`);
      expect(res.statusCode).toBe(200);
    });
  });