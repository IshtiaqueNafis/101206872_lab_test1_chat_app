const express = require('express');
const dotenv = require("dotenv");
dotenv.config()
const app = express();

app.get('/', (req, res) => {
    res.send('APi is RUnning');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on Port ${PORT}`));