const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Use environment port OR fallback (important for deployment)
const PORT = process.env.PORT || 3000;

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ===== ROUTES =====
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/matches", require("./routes/matchesRoute"));
app.use("/api/users", require("./routes/userRoutes"));

// ===== DATABASE & SERVER START =====
const dbconnection = require("./db/db-config");

async function start() {
  try {
    await dbconnection.execute("SELECT 'DB Connected'");
    console.log("✅ Database connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
}

start();
