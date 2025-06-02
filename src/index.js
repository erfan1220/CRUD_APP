import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userroutes from "./routes/userroutes.js";
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// routes 
app.use("/user", userroutes);
// const result = await pool.query("select * from users");
// console.log(result.rows);

// error handling middleware
app.use(errorHandling);

// server running

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
