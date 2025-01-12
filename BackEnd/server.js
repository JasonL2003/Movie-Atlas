import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/v1/reviews', reviews);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

export default app;
