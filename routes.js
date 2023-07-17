const express = require("express");
const authMiddleware = require("./middleware");
const dataController = require("./controller");

const routes = express.Router();

routes.post("/", authMiddleware, dataController);

module.exports = routes;
