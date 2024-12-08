/* WORKING CODE
import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app 
*/

//ISSUE WITH THIS CODE: I NEED TO USE origin: '*' FOR IT TO WORK BUT ITS NOT SAFE, FIND A WAY TO ALLOW THE CORRECT ORIGINS
import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

const app = express();

app.use(cors({
  origin: ['https://movie-search-vercel-client.vercel.app',
    'https://movie-search-vercel-client.vercel.app/',
    'http://movie-search-vercel-client.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/v1/reviews', reviews);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;











