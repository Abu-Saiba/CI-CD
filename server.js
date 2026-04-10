import express from "express";
import sum from "./sum.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Route: home
app.get("/home", (req, res) => {
  res.json({ msg: "I am Abu Saiba!" });
});

// Route: sum of two numbers
app.get("/getSum/:a/:b", (req, res) => {
  const { a, b } = req.params;

  // Validate inputs
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: "Both parameters must be valid integers." });
  }

  try {
    const result = sum(numA, numB);
    res.json({ ans: result });
  } catch (err) {
    res.status(500).json({ error: "Sum calculation failed." });
  }
});

// Catch-all for undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server after all routes are defined
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});