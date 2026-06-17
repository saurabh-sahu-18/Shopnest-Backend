const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

connectDb();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("shopnest backend is working properly");
});

app.use("api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});