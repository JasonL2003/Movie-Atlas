import app from "./server.js"
import mongodb from "mongodb"
import dotenv from 'dotenv'
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config();

const MongoClient = mongodb.MongoClient

//URI Before MONGODB Integration on Vercel: const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.v37my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = process.env.MONGODB_URI;  

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS:2500,
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })




