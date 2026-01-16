import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // 2. Extract token
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

export default authMiddleware;
