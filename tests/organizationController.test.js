const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER, SECRET_KEY , DB_NAME } = process.env;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

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


/* Testing the API endpoints. */
describe("POST api/organization", () => {
  it("created organization successfully", async () => {
    const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWI5ZTk2OGQyNTY4YjgyMzM3NzJmYzEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwNjc3MDA5MX0.XxElI91DU30j7z5hgBVsBq1dOjTKbRmY3yFnH0BRne0";
    const response = await request(app).post("/api/organization").set("Authorization", `Bearer ${authToken}`).send({
      companyName: "abc pvt. ltd.",
      registeredCompanyName: "sahu pvt. ltd.",
      registeredAddress: "Nagpur 440017",
      gst_no: "HDS1489564",
      pan_number: "HZQA785",
      TIN: 4564584578,
      TAN: 784587478549,
      MOU: "ABC45785",
      manage_licence: "457812hgt",
    });
    expect(response.status).toBe(201);
  });

  it("should handle organization error", async () => {
    // Try to signup with the same username again
    const response = await request(app).post("/api/organization").send({
    
    });
    expect(response.status).toBe(401);
  });

});

describe("POST /api/organization/addaccountdetail", () => {
  it(" should Add Account Details ", async () => {
    const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWE5MDc1ZTA1YWVlNDdkNDI5NTE3ODgiLCJpYXQiOjE3MDU2NTk4NzJ9.4kVfnBaavd2HMAUWnAz7xA8QqnnfecqI6uIer_9yYWU";
   
    const response = await request(app).post("/api/organization/addaccountdetail").set("Authorization", `Bearer ${authToken}`).send({
      accountNumber: "123456789456",
      ifscCode : "BARB0RANIDU" ,
      bankName: "State Bank Of India",
      cancelCheque:"https://foo.bar.pizza-monster.png"  
    });
    expect(response.status).toBe(200);
  });

  it("should handle Account Details error", async () => {
    
    const response = await request(app).post("/api/organization/addaccountdetail").send({});

    expect(response.status).toBe(401);
  });

});


