import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyJWT = async (req) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
