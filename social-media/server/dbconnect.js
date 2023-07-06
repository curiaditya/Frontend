const mongoose = require('mongoose');

module.exports = async () => {
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

}