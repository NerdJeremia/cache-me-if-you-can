import express from "express";
import pg from "pg";

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

app.get("/products", async (req, res) => {
  const start = Date.now();
  try {
    // Get result from Database
    const dbResult = await pool.query(`
          SELECT p.*, SUM(s.quantity) as total_sales
          FROM products p
          JOIN sales s ON p.id = s.product_id
          GROUP BY p.id
          ORDER BY total_sales DESC
          LIMIT 10;
        `);

    const duration = Date.now() - start;
    console.log(`Query took ${duration} ms`);
    res.json(dbResult.rows);
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
