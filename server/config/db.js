import mongoose from 'mongoose';

const connectDB = async () => {
    const url = process.env.MONGO_URI;
    try {
        const conn = await mongoose.connect(url);
        //console.log(process.env);//unneccessary data being exposed
        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
        );
    } catch (error) {
        console.log(`Error: ${error.message}`.red);
        process.exit(1);
    }
}

export default connectDB;