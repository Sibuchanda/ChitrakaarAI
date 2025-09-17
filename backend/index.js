import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}))

await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req,res)=>{
    return res.send("API working.");
});


app.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`);
})