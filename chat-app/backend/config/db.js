const mongoose = require('mongoose');

const connectDB = async () => {
    const mongoURI = 'mongodb+srv://aditya0375:SEeI1j52Ul7eCiiX@cluster0.zrxbmzq.mongodb.net/?retryWrites=true&w=majority';
    try {
        const connect = await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB connected : ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    // try{
    //     const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true});
    //     console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
    // }
    // catch(err){
    //     console.log(`Error: ${err.message}`.red.bold);
    //     process.exit();
    // };
}

module.exports = connectDB;
