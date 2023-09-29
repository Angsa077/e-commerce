import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import products from "./data/products.js";

const app = express();

dotenv.config();
app.use(express.json());
app .use(cors());

app.use(userRoute);
app.get("/api/products", (req, res) => {
    res.send(products);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})