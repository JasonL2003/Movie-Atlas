//LOCAL DEV - app.use(cors()) allows all origins
/*
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

//Vercel Code

import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

const app = express();

app.use(cors({
  origin: [
    'https://movie-search-vercel-client.vercel.app',
    'https://movieatlas.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!'); 
});

app.use('/api/v1/reviews', reviews);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;











