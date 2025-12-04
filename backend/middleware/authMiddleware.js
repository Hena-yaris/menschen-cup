const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, userId, role } = jwt.verify(
      token,
      process.env.JWT_SECRET || "marmic"
    );

    req.user = { username, userId, role };
    next();
  } catch (err) {
    console.error("❌ JWT verify error:", err.message);
    return res.status(401).json({ message: "Authentication invalid" });
  }
};

module.exports = authMiddleware;
