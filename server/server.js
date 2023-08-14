const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('express-group-routes');
// Connecting MongoDB
async function mongoDbConnection() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/excel-bop",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    6000
  );
}
mongoDbConnection().then(() => {
  console.log("MongoDB successfully connected.");
}),
  (err) => {
    console.log("Could not connected to database : " + err);
  };

const bookRoute = require("./routes/book");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// API
app.group("/api", (router) => {
    router.use("/book", bookRoute)
})
// app.use("/api", bookRoute);
// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Listening On http://localhost:${port}/api`);
});
// Find 404
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
