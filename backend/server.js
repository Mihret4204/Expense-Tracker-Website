import express from 'express';
const  app = express();
import dotenv from 'dotenv';
dotenv.config();
// import pool from "./src/config/db.js";
app.use(express.json());

import userRoutes from "./routes/userRouter.js";
import transactionRoutes from "./routes/transactionRouter.js";

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);



const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});