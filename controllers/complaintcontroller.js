import pool from "../db.js";
const createComplaint = (req, res, next) => {
  const id = req.user.id;

  const fileBuffer = req.file.buffer;

  const filesv = fileBuffer.toString("base64");
  console.log("entered");
  const { title, description, address, ward, category } = req.body;
  pool.query(
    "INSERT INTO complaint (user_id, title, description, address, ward,category,image) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [id, title, description, address, ward, category, filesv],
    (error, results) => {
      if (error) {
        next(error.message);
      } else {
        res.status(200).json({
          status: "success",
          message: "Complaint added sucessfully",
          // data: results.rows[0],
        });
      }
    }
  );
};
const getOwnComplaint = (req, res, next) => {
  const id = req.user.id;
  pool.query(
    "select id,title, priority, status FROM complaint Where user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        next("Failed to get");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const getAllComplaint = (req, res, next) => {
  pool.query(
    "select  username,created_at, title, description, status, complaint.address, complaint.ward, category,priority, image from complaint inner join users on complaint.user_id = users.id ",
    (error, results) => {
      if (error) {
        next(error.message);
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

const deleteComplaint = (req, res, next) => {
  const id = req.params.id;
  pool.query("DELETE FROM complaint WHERE id = $1", [id], (error, results) => {
    if (error) {
      next(error.message);
    } else {
      res.status(200).json({
        status: "success",
        message: "Complaint deleted sucessfully",
      });
    }
  });
};

const updatePriority = (req, res, next) => {
  const { id, name } = req.body;
  pool.query(
    "UPDATE complaint SET priority= $1 WHERE id=$2",
    [name, id],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json({ status: "success", message: "Priority updated" });
    }
  );
};

const updateStatus = (req, res, next) => {
  const { id, name } = req.body;
  pool.query(
    "UPDATE complaint SET status= $1 WHERE id=$2",
    [name, id],
    (error, results) => {
      if (error) {
        next(error);
      }
      res.status(200).json({ status: "success", message: "Status updated" });
    }
  );
};

// const createPurchase = async (req, res, next) => {
//   const { username, items } = req.body;
//   try {
//     const purchaseQuery = {
//       text: "INSERT INTO purchase (username) VALUES ($1) RETURNING id",
//       values: [username],
//     };
//     const purchaseResult = await pool.query(purchaseQuery);
//     const purchaseId = purchaseResult.rows[0].id;

//     const itemQueries = items.map((item) => ({
//       text: "INSERT INTO purchase_item (purchase_id, name, price) VALUES ($1, $2, $3)",
//       values: [purchaseId, item.name, item.price],
//     }));

//     for (const itemQuery of itemQueries) {
//       await pool.query(itemQuery);
//     }

//     res.status(200).json({ message: "Purchase created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// const getAllPurchases = (req, res, next) => {
//   pool.query(
//     "select username, name, price from purchase_item inner join purchase on purchase_item.purchase_id = purchase.id",
//     (error, results) => {
//       if (error) {
//         next("Failed to get");
//       } else {
//         res.status(200).json({
//           result:
//             //check whether username is same if same group all rows in one
//             results.rows.reduce((acc, row) => {
//               const existingUser = acc.find(
//                 (user) => user.username === row.username
//               );
//               if (existingUser) {
//                 existingUser.items.push({ name: row.name, price: row.price });
//               } else {
//                 acc.push({
//                   username: row.username,
//                   items: [{ name: row.name, price: row.price }],
//                 });
//               }
//               return acc;
//             }, []),

//           // results.rows.map((row) => ({
//           //   username: row.username,
//           //   items: [{ name: row.name, price: row.price }],
//           // })),
//         });
//       }
//     }
//   );
// };

export {
  createComplaint,
  getAllComplaint,
  getOwnComplaint,
  deleteComplaint,
  updatePriority,
  updateStatus,
};
