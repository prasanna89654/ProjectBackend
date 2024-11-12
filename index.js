import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import maintainerRoutes from "./routes/maintainerRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
    });

app.use("/", userRoutes);

app.use("/", maintainerRoutes);

app.use("/", complaintRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

//new push
//another 1 push
