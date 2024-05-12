import express from 'express';
import cors from 'cors';
import indexRoutes from './routes'
import errorHandler from './middleware/error-handler';
import connectDb from './config/connectDb';
import dotenv from 'dotenv'; dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use('/api', indexRoutes);


app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})