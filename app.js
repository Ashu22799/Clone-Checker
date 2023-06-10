const { Console, error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = new mongoose.model("Product", productSchema);

// create Product
// create Product

app.post("/new", async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// read product

app.get("/new/products", async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    //   msg: "working",
    success: true,
    products,
  });
});
// });

//Update product

app.put("/new/products/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useIndAndModify: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete products

app.delete("/new/products/:id", async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  } else {
    const product = await Product.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Product is deleted Successfully",
    });
  }
  // product.findByIdAndRemove({_id : req.params.id});
});

app.listen(4500, () => {
  console.log("Server is Working http://localhost:4500");
});
