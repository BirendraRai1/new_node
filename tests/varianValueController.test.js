const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let unit_Id_value;


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});


describe("POST /api/variantValue", (req,res) => {
    it("should create a Unit", async () => {
      const res = await request(app).post("/api/variantValue").send({
        variant_id: "65b7924ea4e138a3bc877c98",
        value:["raj"],
        updated_By:"65a565d5f8e4b5b1b6ebb9b5"
    });
    unit_Id_value = res.body.data._id;
      expect(res.statusCode).toBe(201);
    });
    // it("should Not create a Unit", async () => {
    //     const res = await request(app).post("/api/variantValue").send({
         
    //   });
    //     expect(res.statusCode).toBe(500);
    //   });
  });

  describe("GET /api/variantValue", () => {
    it("should return all Unit", async () => {
      const res = await request(app).get("/api/variantValue");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/variant/:id", () => {
    it("should return One Unit by Id", async () => {
      const res = await request(app).get("/api/variantValue/65af86c02c06d7f228ce88f5");
      expect(res.statusCode).toBe(200);
    });
  });


  describe("PUT /api/variantValue/:id", () => {
    it("should update a Unit", async () => {
      const res = await request(app)
        .patch("/api/variantValue/65b792d67989e8fefe5dc1a9")
        .send({
            variant_id: "65b7924ea4e138a3bc877c98",
            value:"rajtilak",
            updated_By:"65a565d5f8e4b5b1b6ebb9b5"
         });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE /api/variantValue/:id", () => {
    it("should delete a Unit", async () => {
      const res = await request(app).delete(`/api/variantValue/${unit_Id_value}`);
      expect(res.statusCode).toBe(200);
    });
  });