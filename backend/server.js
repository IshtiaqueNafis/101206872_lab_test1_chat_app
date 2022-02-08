const express = require('express');
const dotenv = require("dotenv");
const connectDb = require("./config/Db");
const userRoutes = require("./Routes/userRoutes")
const {errorHandler, notFound} = require("./middlewares/errorMiddleWare");
dotenv.config()
connectDb();
const app = express();
app.use(express.json());

app.use(notFound);
app.use(errorHandler)

app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on Port ${PORT}`));