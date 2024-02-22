const mongoose = require("mongoose");
const request = require("supertest");
const { CustomError } = require("../errors/CustomErrorHandler");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let unit_Id;


/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});


describe("POST /api/variant", () => {
    it("should create a Unit", async () => {
      const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE5MDc1ZTA1YWVlNDdkNDI5NTE3ODgiLCJpYXQiOjE3MDU2Njk2MTB9.xmP16DjQDc-QtrK5KqGKTsAcCXSd7tCRmcrMIiS9TYg"
      const res = await request(app).post("/api/variant")
      // .set("Authorization", `Bearer ${authToken}`)
      .send({
        name:"UniqueData",
        updated_By:"65c07170dc158ea897839441"
      });
       unit_Id = res.body.data._id;
      expect(res.statusCode).toBe(201);
    });
    it("should Not create a Unit", async () => {
        const res = await request(app).post("/api/variant").send({
         
       });
        expect(res.statusCode).toBe(403);
      });
  });

  describe("GET /api/variant", () => {
    const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWFiNjc2YTgyMDRjMDlkMDZhMzAwOWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDY3Nzk4NTN9.WNJhbJ5cJ2jTtul00ptadZA0gnravoEVqr1eLvncrhU"
    it("should return all Unit", async () => {
      const res = await request(app).get("/api/variant").set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/variant/:id", () => {
    const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWFiNjc2YTgyMDRjMDlkMDZhMzAwOWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDY3Nzk4NTN9.WNJhbJ5cJ2jTtul00ptadZA0gnravoEVqr1eLvncrhU"
    it("should return One Unit by Id", async () => {
      const res = await request(app).get("/api/variant/65af86c02c06d7f228ce88f5").set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });


  describe("PUT /api/variant/:id", () => {
    it("should update a Unit", async () => {
      const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWFiNjc2YTgyMDRjMDlkMDZhMzAwOWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDY3Nzk4NTN9.WNJhbJ5cJ2jTtul00ptadZA0gnravoEVqr1eLvncrhU"
      const res = await request(app)
        .patch(`/api/variant/${unit_Id}`).set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Rice daal",
          updated_By: "65ab676a8204c09d06a3009c",
         });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE /api/variant/:id", () => {
    const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWFiNjc2YTgyMDRjMDlkMDZhMzAwOWMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDY3Nzk4NTN9.WNJhbJ5cJ2jTtul00ptadZA0gnravoEVqr1eLvncrhU"
    it("should delete a Unit", async () => {
      const res = await request(app).delete(`/api/variant/${unit_Id}`).set("Authorization", `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
    });
  });