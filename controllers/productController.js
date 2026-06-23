const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

const getProduct = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(201).json(products);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error, getProduct controller"});
    } 
};

const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(201).json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}