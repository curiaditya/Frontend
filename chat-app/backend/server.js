const express = require('express');
const { chats } = require('./data/data.js');
require('dotenv').config();
const connectDB = require('./config/db.js');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const {
  notFound,
  errorHandler,
} = require('./middlewares/errorHandlerMiddleware.js');

connectDB();

const app = express();

app.use(express.json()); // To accept json data from frontend



// Used a separate Router for users, to look clean
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.use(notFound);
app.use(errorHandler);


const PORT = 5000;

app.listen(PORT, console.log(`APP IS RUNNING ON ${PORT}`.yellow));
