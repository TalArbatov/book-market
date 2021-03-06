require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
//CONFIG mongoDB
const DB_ADDRESS = process.env.DB_ADDRESS_PRODUCTION;
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true }, err => {
  if (err) console.log(`DB_ERR: ${err}`);
  else console.log(`MONGO_DB: Connected to: ${DB_ADDRESS}`);
});
require("./models/UserSchema");
require("./models/PostSchema");
 require("./models/CommentSchema");

//CONFIG passport
require("./passport");

//CONFIG express
const PORT = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, "..", "client", "public");
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' , parameterLimit: 1000000}));
app.use("/", express.static(publicPath));
app.use("/", require("./routes"));
app.use(morgan());
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
