const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
const app = express();
const AuthRouter = require("./router/authRouter");
const ProductRouter = require("./router/productRouter");
const OrganisationRouter = require("./router/organizationRouter");
const AdminRouter = require("./router/adminRouter");
const UploadFiles = require("./router/uploadRoutes");
const ContactUs = require("./router/contactUsRoutes");
const Category = require("./router/categoryRouter");
const Subcategory = require("./router/subcategoryRouter");
const ChildCategory = require("./router/childCategoryRouter");
const variantRelated = require("./router/variantRouter");
const variantValueRelated = require("./router/varianValueRouter");
const InventoryRelated = require("./router/inventoryRouter");
const Brand = require("./router/brandRouter");
const DescriptionType = require("./router/descriptionTypeRouter");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

const { PROJECT_LINK } = process.env;
//we can set origin as http://localhost:4000 to allow react application coming from 4000 port only
const corsConfig = {
  origin: PROJECT_LINK,
  credentials: true,
};

const path = require("path");
app.use(express.static(path.join(__dirname, "../horeca_node")));

app.use(limiter);
app.use(helmet());
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(fileUpload());

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
app.use("/api/organization", OrganisationRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/uploadFiles", UploadFiles);
app.use("/api/contactUs", ContactUs);
app.use("/api/category", Category);
app.use("/api/subCategory", Subcategory);
app.use("/api/childCategory", ChildCategory);
app.use("/api/variant", variantRelated);
app.use("/api/variantValue", variantValueRelated);
app.use("/api/inventory", InventoryRelated);
app.use("/api/brand", Brand);
app.use("/api/description", DescriptionType);

app.get("/list", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Hello World",
    },
  ]);
});

app.use(function cb(req, res) {
  res.status(404).json({
    status: "failure",
    message: " route not found",
  });
});
module.exports = app;
