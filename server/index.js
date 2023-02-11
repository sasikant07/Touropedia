import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

import connectDB from './config/db.js';

import userRouter from './routes/user.js';
import tourRouter from './routes/tour.js';

dotenv.config({path: "./config/config.env"});
connectDB();

const app = express()
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.use('/', 'Hello World!');
app.use("/users", userRouter); // http://localhost:8000/users/signup
app.use("/tour", tourRouter);

const PORT = process.env.PORT || 8000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgMagenta.bold
    )
);