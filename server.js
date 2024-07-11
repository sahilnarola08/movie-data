const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/dbconnection/db');
const movieRoutes = require('./src/routes/movieRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    credentials: true
  }));
  
app.use('/movie', movieRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Connected to mongodb server.`);
  });