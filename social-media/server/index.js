const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require('./dbconnect');
const authRouter = require('./routers/authrouter');
const postsRouter = require("./routers/postsRouter");
const userRouter = require('./routers/userrouter');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
dotenv.config("./.env");

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('common'));
app.use(cookieparser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use('/auth', authRouter);
app.use("/posts", postsRouter);
app.use('user', userRouter);
app.get("/", (req, res) => {
    res.status(200).send('OK from Server');
});
const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

