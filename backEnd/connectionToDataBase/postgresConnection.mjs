import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export const connectDB = () => {
  return new Promise((resolve, reject) => {
    // pazadi kad grazins dokumentus atgal
    pool.connect((err) => {
      if (err) {
        console.error("connection error", err.stack);
        reject(err);
      } else {
        resolve("Database connected successfully");
      }
    });
  });
};



