const express = require("express");
const getTopics = require("./Controllers/getTopics.controller");

const app = express();

app.get("/api/topics", getTopics);

module.exports = app;
