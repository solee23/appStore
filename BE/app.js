const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes/index');
const error = require('./src/middlewares/error');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

dotenv.config();

app.use(express.json());

app.use("/api/v1",router);
app.use(error);

module.exports = app;