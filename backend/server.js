import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import startupRoutes from "./routes/startupRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/interests", interestRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
