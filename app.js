// Here is where we import modules
// We begin by loading Express
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose"); // require package

const app = express();

const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

//middleware
app.use(morgan("dev"));

//db things
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

    
const Fruit = require("./models/customerModule.js");

  // another way of doing the connection above
// const connect = async () => {
// await mongoose.connect(process.env.MONGODB_URI);
// console.log('Connected to MongoDB');
// await runQueries()
// await mongoose.disconnect();
// console.log('Disconnected from MongoDB');
// process.exit();
// };

//routes

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


app.get("/", async (req, res, next) => {
    res.render("index.ejs");
  });