const express = require("express");
const {
  getTopics,
  getApi,
  getArticleId,
  getArticles,
  getArticleComments,
  postCommentsByArticle,
  patchArticleByArticleID,
  deleteCommentByID,
} = require("./Controllers/index");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handlers");

const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleId);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postCommentsByArticle);

app.patch("/api/articles/:article_id", patchArticleByArticleID);

app.delete("/api/comments/:comment_id", deleteCommentByID);

app.use("/*", (request, response) => {
  response.status(404).send({ msg: "Route not found" });
});

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);
module.exports = app;
