import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  console.log("AUTH HEADER 👉", req.headers.authorization);

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided ❌" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing ❌" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // 🔥 user id available everywhere
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token ❌" });
  }
};

export default protect;
