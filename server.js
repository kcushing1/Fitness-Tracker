//set up express
//make sure all heroku requirements are met
//set up schema
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const Workout = require("./models/worksouts");

const app = express();
app.use(logger("dev"));
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//require("./routes/routes")(app)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//app.listen(PORT, () => {
// console.log(`App running on port ${PORT}!`);
//});
