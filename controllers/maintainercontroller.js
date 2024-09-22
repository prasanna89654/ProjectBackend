import pool from "../db.js";

const createRequest = (req, res, next) => {
  const fileBuffer = req.file.buffer;
  const filesv = fileBuffer.toString("base64");
  const { name, position, description, role, userid } = req.body;

  pool.query(
    "INSERT INTO maintainer (name, position, description, role, userid, file) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, position, description, role, userid, filesv],
    (error, results) => {
      if (error) {
        next(error.message);
      } else {
        res.status(200).json({
          status: "success",
          message: "Request sent to Admin",
          // data: results.rows[0],
        });
      }
    }
  );
};

const createmulti = (req, res, next) => {
  const { name, country } = req.body;
  pool.query(
    "INSERT INTO multi (name, country) VALUES ($1, $2)",
    [name, country],
    (error, results) => {
      if (error) {
        next(error.message);
      } else {
        res.status(200).json({
          status: "success",
          message: "Request sent to Admin",
          // data: results.rows[0],
        });
      }
    }
  );
};

const getmulti = (req, res, next) => {
  pool.query("SELECT * FROM multi", (error, results) => {
    if (error) {
      next("Failed to get");
    } else {
      res.status(200).json(results.rows);
    }
  });
};
const getRequest = (req, res, next) => {
  pool.query("SELECT * FROM maintainer", (error, results) => {
    if (error) {
      next("Failed to get");
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const deleteRequest = (req, res, next) => {
  const id = req.params.id;
  pool.query("DELETE FROM maintainer WHERE id = $1", [id], (error, results) => {
    if (error) {
      next("Failed to remove");
    } else {
      res.status(200).json({
        status: "success",
      });
    }
  });
};

const createFileRequest = (req, res, next) => {
  // const { name, position, description, role } = req.body;
  const fileBuffer = req.file.buffer;
  const filesv = fileBuffer.toString("base64");
  // const fileName = req.file.originalname;
  const { name, country } = req.body;
  pool.query(
    "INSERT INTO file (name, country, data) VALUES ($1, $2 , $3)",
    [name, country, filesv],
    (error, results) => {
      if (error) {
        next(error.message);
      } else {
        res.status(200).json({
          status: "success",
          message: "File Uploaded Sucessfully",
          // data: results.rows[0],
        });
      }
    }
  );
};

const getFile = (req, res, next) => {
  pool.query("SELECT * FROM file", (error, results) => {
    if (error) {
      next("Failed to get");
    } else {
      res.status(200).json({
        totalCount: results.rowCount,

        result: results.rows,
      });
    }
  });
};

export {
  createRequest,
  getRequest,
  deleteRequest,
  createFileRequest,
  getFile,
  createmulti,
  getmulti,
};
