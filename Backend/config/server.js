const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

const configServer = (app) => {
  require("dotenv").config();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use(express.static(path.join(__dirname, "../../Frontend")));
  app.use(express.static(path.join(__dirname, "../../Frontend/Html")));
  app.use(express.static(path.join(__dirname, "../../Frontend/Script")));
  app.use(express.static(path.join(__dirname, "../../Frontend/Css")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/Html/index.html"));
  });

  return app;
};

const startServer = (app) => {
  const PORT = process.env.PORT || 5500;

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

module.exports = {
  configServer,
  startServer,
};
