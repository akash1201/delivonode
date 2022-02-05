import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';

//routes
import userRoutes from './routes/userRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import uploadRoute from './routes/uploadRoute.js';
import otpRoute from './routes/smsIntegrationRoutes.js';
import productRoute from './routes/productRoutes.js'

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
app.use(`/api/stores`, storeRoutes);
app.use(`/api/upload`, uploadRoute);
app.use(`/api/sms`, otpRoute);
app.use(`/api/products`, productRoute);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



const PORT = process.env.PORT || 5000

app.listen(
          PORT,
          console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
          )
        )

