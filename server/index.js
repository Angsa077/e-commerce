import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import products from "./data/products.js";

const app = express();

dotenv.config();
app.use(express.json());
app .use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/api/products", (req, res) => {
    res.send(products);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connection successful");
}).catch((err) => {
    console.log("DB connection failed", err.message);
})