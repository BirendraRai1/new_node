const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();

const { CustomError } = require("../errors/CustomErrorHandler");
const { DB_PASSWORD, DB_USER, DB_NAME, SECRET_KEY } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const { restrict, restrictAll } = require("../middlewares/restrict");
let createdUserId;
let createdToken;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/login", () => {
  it("user logged successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "birendrabit123@gmail.com",
      password: "biru@1234",
    });
    expect(res.status).toBe(200);
  });
  it("invalid email credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "hksm19@gmail.com",
      password: "Sahu199@",
    });
    expect(res.status).toBe(401);
  });

  it("invalid password credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "birendrabit123@gmail.com",
      password: "biru@123",
    });
    expect(res.status).toBe(403);
  });
});

describe("POST /api/auth/changePassword", () => {
  // it("password should be changed", async () => {
  //   const authToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE5MDc1ZTA1YWVlNDdkNDI5NTE3ODgiLCJpYXQiOjE3MDY1MTcwMTl9.UMxPaBpVjetvrOMboTOxCv83JcvpMArcOmiayyEOPTg";
  //   const res = await request(app)
  //     .post("/api/auth/changePassword")
  //     .set("Authorization", `Bearer ${authToken}`)
  //     .send({
  //       currentPassword:"biru@1234",
  //       password:"raj12345",
  //       confirmPassword:"raj12345"
  //     });
  //   expect(res.status).toBe(200);
  // });
  it("currentPassword should be same to change password", async () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE5MDc1ZTA1YWVlNDdkNDI5NTE3ODgiLCJpYXQiOjE3MDY1MTcwMTl9.UMxPaBpVjetvrOMboTOxCv83JcvpMArcOmiayyEOPTg";
    const res = await request(app)
      .post("/api/auth/changePassword")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        currentPassword: "123456789",
        password: "123456789",
        confirmPassword: "123456789",
      });
    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      message: "Your current password doesn't matched",
      status: "failure",
    });
  });
});

/* Testing the API endpoints. */
describe("POST /api/auth/signup", () => {
  it("user created successfully", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      name: "Biru",
      email: "biru1@gmail.com",
      number: 9131167993,
      password: "password123",
      confirmPassword: "password123",
      roles: "admin",
    });
    createdUserId = response.body.user._id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should handle signup duplicate username error", async () => {
    // Try to signup with the same username again
    const response = await request(app).post("/api/auth/signup").send({
      name: "Raj",
      email: "rp01@gmail.com",
      number: 9131154780,
      password: "123456789",
      confirmPassword: "123456789",
      roles: "admin",
    });
    expect(response.status).toBe(400);
  });
});

describe("POST /api/auth/:id/:token", () => {
  it("should change forgot password reset and return success message", async () => {
    // Initiate password reset
    let secret = createdUserId + process.env.SECRET_KEY;
    createdToken = jwt.sign({ userID: createdUserId }, secret, {
      expiresIn: "15m",
    });
    // console.log(createdToken);
    const response = await request(app)
      .post(`/api/auth/${createdUserId}/${createdToken}`)
      .send({
        password: "biru@12345",
        confirmPassword: "biru@12345",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Successfully updated" });
  });
  it("should handle password reset for a non-existent user", async () => {
    // Initiate password reset for a non-existent user
    const response = await request(app).post(
      "/api/auth/signup/65a5117996a91097acb28964/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE1MTE3OTk2YTkxMDk3YWNiMjg5NjQiLCJpYXQiOjE3MDUzMTczMzYsImV4cCI6MTcwNTMxODIzNn0.DhNmcrbYoCMVN_ZPIVbFlc7wJjRuuThiYonRarVgsN0"
    );
    // .send({
    //   username: 'nonexistentuser',
    // });

    expect(response.statusCode).toBe(404);
    // });
  });
});

describe("DELETE /api/auth/deleteuser/:id", () => {
  it("Should be delete", async () => {
    let ExistentUserId = createdUserId;
    const res = await request(app).delete(
      `/api/auth/deleteuser/${ExistentUserId}`
    );
    expect(res.status).toBe(200);
  });
  it("Should Not Delete", async () => {
    const nonExistentUserId = "65a636342749fb5c";
    const res = await request(app)
      .delete(`/api/auth/deleteuser/${nonExistentUserId}`)
      .send({});
    expect(res.status).toBe(500);
  });
});

// staff login
describe("POST /api/auth/staffLogin", () => {
  it("user logged successfully", async () => {
    const res = await request(app).post("/api/auth/staffLogin").send({
      email: "rajPatel@gmail.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
  });

  it("invalid credentials", async () => {
    const res = await request(app).post("/api/auth/staffLogin").send({
      email: "hksm19@gmail.com",
      password: "Sahu199@",
    });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Invalid email",
      status: "failure",
    });
  });
});

// staff permission
describe("GET /api/auth/allData", () => {
  it("Add product data show in Staff", async () => {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWJjYmZjNTQ4NzZjM2Q0MWVmYWYxNjEiLCJyb2xlIjoiU3RhZmYiLCJpYXQiOjE3MDY5MzgwNDN9.WvmuX4Jg1jWKdrARWrPZ03ZXlHO05abaFnOjvvjS9Dw";
    const res = await request(app)
      .get("/api/auth/allData")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
  });
});
