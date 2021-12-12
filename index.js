import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

//DB connection will come here

const app = express();

if (process.env.NODE_ENV === 'development') {
          app.use(morgan('dev'))
        }

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000

app.listen(
          PORT,
          console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
          )
        )

