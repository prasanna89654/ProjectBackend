import jwt from "jsonwebtoken";
import pool from "../db.js";

const protect = async (req, res, next) => {
  const JWT_SECRET = "secret"
  console.log("protect");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const result = await pool.query("select * from users where id = $1", [
        decoded.id,
      ]);
      req.user = result.rows[0];
      next();
    } catch (error) {
      next(error.message);
    }
  }
  if (!token) {
    res.status(401);
    next("Not authorized, no token");
  }
};

export { protect };
