import express from "express";
import pg from "pg";
import { createClient } from "redis";

const { Pool } = pg;
const app = express();
const port = 3000;

const pool = new Pool({
  user: "node_user",
  host: "localhost",
  database: "node_db",
  password: "supersecurepassword",
  port: 5432,
});

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();
console.log("Connected to Redis");

app.get("/products", async (req, res) => {
  const start = Date.now();
  try {
    // Try to get the result from Redis first
    const redisResult = await redisClient.get("products");
    if (redisResult) {
      const duration = Date.now() - start;
      console.log(`Query (cached) took ${duration} ms`);
      res.json(JSON.parse(redisResult));
    } else {
      // If the result does not exist in Redis, query the database
      const dbResult = await pool.query(`
          SELECT p.*, SUM(s.quantity) as total_sales
          FROM products p
          JOIN sales s ON p.id = s.product_id
          GROUP BY p.id
          ORDER BY total_sales DESC
          LIMIT 10;
        `);

      // Save the database query result to Redis
      redisClient.setEx("products", 60, JSON.stringify(dbResult.rows));

      const duration = Date.now() - start;
      console.log(`Query (not cached) took ${duration} ms`);
      res.json(dbResult.rows);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while querying the database" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
