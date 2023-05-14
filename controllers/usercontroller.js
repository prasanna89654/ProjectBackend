import pool from "../db.js";
import generateToken from "../utils/generateToken.js";
const createUsers = (req, res, next) => {
  const { name, email, password, location, ward, dob } = req.body;
  pool.query(
    "INSERT INTO public (name, email , password, location, ward, dob) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, email, password, location, ward, dob],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json({
        status: "success",
        message: "User added sucessfully",
        data: results.rows,
      });
    }
  );
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    next("Please provide email or password");
  } else {
    const result = await pool.query("SELECT * FROM public WHERE email=$1", [
      email,
    ]);
    if (result.rowCount === 0) {
      res.status(400);
      next("Email doesn't exists");
    } else {
      const hashed_password = result.rows[0].password;

      if (password !== hashed_password) {
        res.status(400);
        next("Password doesn't match");
      } else {
        const token = generateToken(result.rows[0].id);

        res.json({
          username: result.rows[0].name,
          email: result.rows[0].email,
          token: token,
          //   password: result.rows[0].password,
        });
      }
    }
  }
};

const getUsers = (req, res, next) => {
  pool.query("SELECT * FROM public", (error, results) => {
    if (error) {
      next("Failed to get");
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getUsersById = (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM public WHERE id=$1", [id], (error, results) => {
    if (error) {
      next(error.message);
    }
    if (results.rowCount === 0) {
      next("User not found");
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

const getUserProfile = async (req, res, next) => {
  const id = req.user.id;

  const result = await pool.query("select * from public where id = $1", [id]);
  if (result.rowCount === 0) {
    res.status(404);
    next("User not found");
  }
  res.json(result.rows[0]);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM public WHERE id=$1", [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json({ status: "success", message: results.rows.length });
  });
};

const updateUser = (req, res, next) => {
  console.log("id", id);
  const { name, email, password } = req.body;
  pool.query(
    "UPDATE public SET name=$1, email=$2, password=$3 WHERE id=$4",
    [name, email, password, id],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json({ status: "success", message: "User updated" });
    }
  );
};

const logout = (req, res) => {
  tokenBlacklist.add(req.token);

  res.json({ message: "Logged out successfully" });
};

export {
  login,
  createUsers,
  getUsers,
  deleteUser,
  getUsersById,
  updateUser,
  getUserProfile,
  logout,
};
