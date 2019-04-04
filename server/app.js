require('dotenv').config()
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

//CONFIG express
const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, '..', 'client', 'public');
app.use('/', express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})