//packages
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

//utils and config
import connectDB from "./config/db.js";

//routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
