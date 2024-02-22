const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
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


describe("POST /api/childCategory/", () => {
    it("Should Create a Child Category", async () => {
      const res = await request(app).post("/api/childCategory/").send({
            child_category_type : "turmeric_powder",
            isActive : true,
            updated_By:"65a6379e0f7fd597fd19489f",
            sub_category_id:"65af874455e07c2b0593ce75"
    });
      category_Id = res.body._id;
      expect(res.statusCode).toBe(200);
    });
    it("should Not create a Child Category", async () => {
        const res = await request(app).post("/api/category/postCategory").send({
     
      });
        expect(res.statusCode).toBe(404);
      });
  });

describe("GET /api/childCategory/", () => {
    it("should return all Child Category", async () => {
      const res = await request(app).get("/api/childCategory/");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/childCategory/:id", () => {
    it("should return One Child Category by Id", async () => {
      const res = await request(app).get("/api/childCategory/65af8ee89ba2ade126da62b4");
      expect(res.statusCode).toBe(200);
    });
  });  

  describe("PUT /api/childCategory/:id", () => {
    it("should update a Child Category", async () => {
      const res = await request(app)
        .patch(`/api/childCategory/${category_Id}`)
        .send({
            child_category_type : "Basmati Rice",
            isActive : true,
            updated_By : {userID: "65a565d5f8e4b5b1b6ebb9b5"},
            sub_category_id : "65b4a38e9003d4fc42606689"
          });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE /api/childCategory/:id", () => {
    it("should delete a Category", async () => {
      const res = await request(app).delete(`/api/childCategory/${category_Id}`);
      expect(res.statusCode).toBe(200);
    });
  });