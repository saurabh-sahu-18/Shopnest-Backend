const express = require("express");
const { createOrder, verifyOrder } = require("../controllers/paymentController");

const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifyOrder);

module.exports = router;