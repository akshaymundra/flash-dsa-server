import mongoose from "mongoose";


export default async function connectDb() {

    const MONGO_URI = process.env.MONGO_URI || '';

    try {
        const res = await mongoose.connect(MONGO_URI);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
    }
}