const mongoose = require("mongoose");

require("dotenv").config();

const DBHost = process.env.DB_HOST;
const DBUser = process.env.DB_USER;
const DBPassword = process.env.DB_PASSWORD;
const DBName = process.env.DB_NAME;

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb://${DBHost}:27017/${DBName}`);
console.log("Connected to MongoDB");
