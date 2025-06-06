const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = async()=> {
    try{
    await mongoose.connect(process.env.MONGO_URI);
    } catch(err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit with failure
    };
};


module.exports = connectDB;