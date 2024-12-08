import express from "express";
import pool from "../config/db";
import { UserSchema } from "../models/userModel";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validatedData = UserSchema.parse(req.body);

    const { first_name, last_name, address, phone, email } = validatedData;

    const query = `
        INSERT INTO users (first_name, last_name, address, phone, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

    const values = [first_name, last_name, address, phone, email];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({
      error: error instanceof Error ? error.message : "Invalid user data",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM users ORDER BY created_at DESC";
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

export default router;
