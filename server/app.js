const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const bookRoute = require("./routes/book_routes");

require("./config/db");

const app = express();
const port = process.env.DB_PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// API
app.use("/api/book", bookRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
