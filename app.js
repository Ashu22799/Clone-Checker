const { Console } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json);

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = new mongoose.model("Product", productSchema);

// create Product
// create Product

app.post("/api/v1/product/new", async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

app.listen(4500, () => {
  console.log("Server is Working http://localhost:4500");
});
