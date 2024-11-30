import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js";

const app = express();

app.use(cors({
  origin: 'https://movie-search-vercel-client.vercel.app',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/v1/reviews", reviews);


app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;











