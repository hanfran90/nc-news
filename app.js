const express = require("express");
const {
  getTopics,
  getApi,
  getArticleId,
  getArticles,
  getArticleComments,
} = require("./Controllers");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handlers");

const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleId);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Route not found" });
});

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);
module.exports = app;
