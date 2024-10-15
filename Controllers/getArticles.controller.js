const fetchArticles = require("../Models/fetchArticles.models");

function getArticles(request, response, next) {
  fetchArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticles;
