const express = require("express");
const getTopics = require("./Controllers/getTopics.controller");

const app = express();

app.get("/api/topics", getTopics);

app.use(express.json());

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "500 server error" });
});
module.exports = app;
