const express = require("express");
const bookRoute = express.Router();
const BookModel = require("../models/Book");
const cors = require("cors");

// CORS OPTIONS
var whitelist = [
  "http://localhost:4200",
  "http://localhost:8000",
  "http://localhost:3002",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

// GET ALL BOOKS
bookRoute.route("/", cors(corsOptionsDelegate)).get(async (req, res, next) => {
  await BookModel.find()
    .then((result) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      return next(err);
    });
});

/* GET SINGLE BOOK BY ID */
bookRoute.route("/:id").get(async (req, res, next) => {
  await BookModel.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

/* SAVE BOOK */
bookRoute.route("/").post(async (req, res, next) => {
  await BookModel.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

/* UPDATE BOOK */
bookRoute.route("/:id").put(async (req, res, next) => {
  await BookModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/* DELETE BOOK */
bookRoute.route("/:id").delete(async (req, res) => {
  await BookModel.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = bookRoute;
