const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER, SECRET_KEY , DB_NAME } = process.env;

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
describe("POST /api/contactUs", () => {
  it("user contact successfully", async () => {
    const response = await request(app).post("/api/contactUs").send({
        name: "Rajtilak patel",
        phone: 9131168997,
        email: "rajpatel22@gmail.com",
        companyName: "Raja ka dhaba part2",
        message: "Hello everyOne",
        userType:"Saahi Khoon hai hum"
    });
    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
  });

  it("should handle  user all required fields", async () => {
    // Try to signup with the same username again
    const response = await request(app).post("/api/contactUs").send({
      name: "Birendra",
      email: "birendrabit123@gmail.com",
      password: "biru@1234",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        message: "All fields are requires",
        status: "failure"
      });
  });

  it("should handle validation errors", async () => {
    const response = await request(app).post("/api/contactUs").send({
      // Missing username and password intentionally to trigger a validation error
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
        message: "All fields are requires",
        status: "failure"
      });
  });
});



