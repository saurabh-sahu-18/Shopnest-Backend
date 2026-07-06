const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error, getProduct controller" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(201).json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error, getProductById controller" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error, createProduct" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.category = category ?? product.category;
      product.stock = stock ?? product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error, updateProduct Controller" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Product Deleted Successfully", deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error, deleteProduct Controller" });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };