const fetchArticles = require("../Models/fetchArticles.models");

function getArticles(request, response, next) {
  const { sort_by } = request.query;
  fetchArticles(sort_by)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticles;
