const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let descriptionId;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});



describe("POST /api/description", () => {
 const description = {
  description_name:"Rajtilak",
   value: ["vanilla"],
   user_id:"65c07170dc158ea897839441"
}
  it("should create a Description", async () => {
    const res = await request(app).post("/api/description").send(description);
    descriptionId = res.body.data._id;
    expect(res.statusCode).toBe(201);
  });
});

/* Testing the API endpoints. */
describe("GET /api/description", () => {
    it("should return all Description", async () => {
      const res = await request(app).get("/api/description");
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe("GET /api/description/:id", () => {
    it("should return a Description", async () => {
      const res = await request(app).get(
        `/api/description/${descriptionId}`
      );
      expect(res.statusCode).toBe(200);
    });
  });

describe("PUT /api/description/:id", () => {
  it("should update a Description", async () => {
    const res = await request(app)
      .patch(`/api/description/${descriptionId}`)
      .send({
        caffine_content: ["Yes"],
        packing_type:["Box","panni"],
          });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/description/:id", () => {
  it("should delete a Description", async () => {
    const res = await request(app).delete(`/api/description/${descriptionId}`);
    expect(res.statusCode).toBe(200);
  });
});
