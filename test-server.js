import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

console.log("Starting server...");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "running", message: "Server is working!" });
});

const PORT = process.env.PORT || 3001;

try {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`Test: http://localhost:${PORT}/`);
  });
} catch (err) {
  console.error("Error starting server:", err);
}
