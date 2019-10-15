require("dotenv").config();

const mongoose = require("mongoose");
const { DBURL_ATLAS } = process.env;

mongoose.Promise = Promise;

mongoose
  .connect(DBURL_ATLAS, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log(`Connected to Mongo on`);
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
