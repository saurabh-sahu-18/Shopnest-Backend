const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const getAdminStats = require("../controllers/analyticsController.js");

const router = express.Router();

router.get("/", getAdminStats);

module.exports = router;