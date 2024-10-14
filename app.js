const express = require("express");
const { getTopics, getApi } = require("./Controllers");

const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Route not found" });
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "500 server error" });
});
module.exports = app;
