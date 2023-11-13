const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes/index');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",router);


module.exports = app;