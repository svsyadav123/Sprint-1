import jwt from "jsonwebtoken";

export default function requireAuth(request, response, next) {
  const token = request.headers.authorization?.startsWith("Bearer ") ? request.headers.authorization.slice(7) : null;
  if (!token) return response.status(401).json({ success: false, message: "Authentication required." });
  try {
    request.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return response.status(401).json({ success: false, message: "Your session has expired. Please log in again." });
  }
}
