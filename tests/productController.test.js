const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
dotenv.config();
const { DB_PASSWORD, DB_USER ,DB_NAME} = process.env;
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let productId;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(dbURL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

/* Testing the API endpoints. */
describe("GET /api/products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get(
      "/api/products/65a565d5f8e4b5b1b6ebb9b5"
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/products", () => {
  const Product = {
    product_title:"Kela2",
    product_image:"https://images.unsplash.com/photo-1682685797088-283404e24b9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8",
   selected_variant: [
     {
     variant_id:"65b79670a4e138a3bc877cb1",
     variant_values:"65b792d67989e8fefe5dc1a9"
     }
   ],
   product_description:"This is a product discription",
   min_order_quantity: 20,
   child_category_id: "65b4a4c750ea6c5f1d56e6be",
   category_id:"65b4a2e49003d4fc42606680",
   subCategory_id: "65b4a38e9003d4fc42606689",
   product_approved: true,
    variantValuesCombo: "kg12",
   seller_sku: "124512",
   stock: 2544,
   price: 
     {
     actual_price:2000,
     selling_price:3000
     },
     brand_name:"Rj",
     item_name:"Raj",
     manufacturer_details:"No details",
     quantity:"good",
     horeca_price:"123",
     main_image_url:"image",
     other_image_url1:"image2",
     specialty:"yes",
     flavour:"lemon",
     item_type_name:"Good",
     number_Of_pieces:5,
     diet_type:"Yes",
     bullet_point:["Hello","RJ"],
     search_terms:"Yes",
     color:"Yello",
     packaging_type:"pack",
     size:"large",
     added_sugars:"no",
     FC_shelf_life_unit:"Yes",
     net_content_volume:"Yes",
     item_form:"No",
     unit_count:"20",
     contains_liquid_contents:"yes",
     ingredients:"Yes",
     allergen_information:"No",
     HSN_code:"Yes",
     minimum_order_quantity:"20",
     maximum_retail_price:"500",
     product_tax_code:"123456"
  };
  it("should create a product", async () => {
    const res = await request(app).post("/api/products").send(Product);
    productId = res.body._id;
    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /api/products/:id", () => {
  it("should update a product", async () => {
    const res = await request(app)
      .patch("/api/products/65a60d3f116f45325d3decd6")
      .send({
          product_title:"This is product title data",
          product_description: "Hello world",
          product_quantity: "1",
          child_category_id: "65af4d437d9e253931fd0f77",
          product_sku: "65af4d437d9e253931fd0f77",
          product_approved: true
          });
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const res = await request(app).delete(`/api/products/65bb4c7c70276bd641b2f39c`);
    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/products/subCategory",()=>{
  it("should get all Sub Category",async ()=>{
    const res = await request(app).post(`/api/products/subCategory`).send({ "id":"65b4a38e9003d4fc42606689"});
    expect(res.statusCode).toBe(200);
  })
})

describe("POST /api/products/childCategory",()=>{
  it("should get all Child Category",async ()=>{
    const res = await request(app).post(`/api/products/childCategory`).send({ "id":"65b4a4c750ea6c5f1d56e6be"});
    expect(res.statusCode).toBe(200);
  })
})

describe("POST /api/products/Category",()=>{
  it("should get all Category",async ()=>{
    const res = await request(app).post(`/api/products/Category`).send({ "id":"65b4a2e49003d4fc42606680"});
    expect(res.statusCode).toBe(200);
  })
})