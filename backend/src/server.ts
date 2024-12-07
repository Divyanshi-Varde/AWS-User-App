import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { pool } from "./config/db";
import { User } from "./types/user.types";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const createUser = async (req: Request, res: Response): Promise<any> => {
  const { firstName, lastName, email, phone, address }: User = req.body;

  if (!firstName || !lastName || !email || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, phone, address]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error: unknown) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

app.post("/api/user", createUser);
app.get("/api/users", getAllUsers);

const PORT = process.env.PORT || 3001; // Ensure the backend uses a different port than the frontend
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;