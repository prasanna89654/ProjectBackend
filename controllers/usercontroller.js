import pool from "../db.js";
import generateToken from "../utils/generateToken.js";
const createUsers = async (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    role,
    phone,
    address,
    ward,
    gender,
    dob,
  } = req.body;

  const emailResult = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  const usernameResult = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (emailResult.rowCount == 0 && usernameResult.rowCount == 0) {
    pool.query(
      "INSERT INTO users (firstname, lastname, username ,email, password,role,phone, address, ward,gender, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)",
      [
        firstname,
        lastname,
        username,
        email,
        password,
        role,
        phone,
        address,
        ward,
        gender,
        dob,
      ],
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
  } else {
    res.status(400);
    next("Email or username already exists");
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    next("Please provide email or password");
  } else {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
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
          username: result.rows[0].username,
          email: result.rows[0].email,
          token: token,
          role: result.rows[0].role,
          //   password: result.rows[0].password,
        });
      }
    }
  }
};

const getUsers = (req, res, next) => {
  pool.query(
    "SELECT * FROM users",
    (error, results) => {
      if (error) {
        next("Failed to get");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const getMaintainers = (req, res, next) => {
  pool.query(
    "SELECT id,username, rolename FROM users where role = 1",
    (error, results) => {
      if (error) {
        next("Failed to get");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const makeAdmin = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(
    "UPDATE users SET role=1, rolename = 'Admin' WHERE id=$1",
    [id],
  (error, results) => {
    if (error) {
      next(error);
    }
    res.status(200).json({ status: "success", message: "User updated" });
  } 
  );
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

  const result = await pool.query("select * from users where id = $1", [id]);
  if (result.rowCount === 0) {
    res.status(404);
    next("User not found");
  }
  res.json(result.rows[0]);
};

// const deleteUser = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query("DELETE FROM public WHERE id=$1", [id], (error, results) => {
//     if (error) {
//       console.log(error);
//     }
//     res.status(200).json({ status: "success", message: results.rows.length });
//   });
// };

const updateUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(
    "UPDATE users SET role=1, rolename = 'Water Maintainer' WHERE id=$1",
    [id],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json({ status: "success", message: "User updated" });
    }
  );
};

const updateMaintainer = (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(
    "UPDATE users SET role=2, rolename = 'user' WHERE id=$1",
    [id],
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
  // deleteUser,
  getUsersById,
  updateUser,
  updateMaintainer,
  getUserProfile,
  logout,
  getMaintainers,
  makeAdmin
};
