import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userAuthRoutes from './api/userAuth.js';
dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

//Allow specific origins for production when NODE_ENV is production set in vercel
if (isProduction) {
  app.use(
    cors({
      origin: [
        'https://movie-search-vercel-client.vercel.app',
        'https://movieatlas.vercel.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
} else {
  //Allow all origins for local development when NODE_ENV is development
  app.use(cors());
}



//User route
const uri = process.env.MONGODB_URI_REVIEWS;

app.use(express.json());

const connectDB = async () => {//Specifically for mongoose
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); //Exit if connection fails
  }
};

connectDB(); //Mongoose connection

app.use("/api", userAuthRoutes);



//Reviews route
app.use('/api/v1/reviews', reviews);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;



//Vercel deployment
app.get('/', (req, res) => {
  res.send('Server is running!');
});