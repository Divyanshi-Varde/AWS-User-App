import pool from "../config/db";

async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      address TEXT,
      phone VARCHAR(15),
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created!");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
}

export const connectToDatabase = async () => {
  try {
    await createUsersTable();
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
};
