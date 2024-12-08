import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { connectToDatabase } from "./migrations";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`)
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
