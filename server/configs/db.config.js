require("dotenv").config();

const mongoose = require("mongoose");
const { DBURL } = process.env;

mongoose.Promise = Promise;

mongoose
  .connect(DBURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
