import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { fileURLToPath } from 'url'; // Import fileURLToPath
import path from "path";

// import routes
import authRoute from "./routes/authRoute.js";
import products from "./data/products.js";
import paymentRoute from "./routes/paymentRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoute);
app.use("/api/payment", paymentRoute);
app.get("/api/products", (req, res) => {
    res.send(products);
});

// Get the directory name using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
