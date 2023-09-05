const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/routes/index')

const app = express();

dotenv.config();

app.use(express.json())

app.use("/api/v1",router)

module.exports = app;