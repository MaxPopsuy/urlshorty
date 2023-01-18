const express = require("express");
const volleyball = require("volleyball");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const apiRouter = require("./routes/api");
const redirect = require("./routes/redirect");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

require("./config/db");

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/", redirect);
app.use("/api/v1", apiRouter);



app.use(errorHandler);

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

module.exports = app;
