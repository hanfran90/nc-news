const fetchArticles = require("../Models/fetchArticles.models");

function getArticles(request, response, next) {
  const { sort_by, order, topic } = request.query;

  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      if (articles.length === 0) {
        response.status(404).send({ msg: "No articles found for that topic!" });
      }

      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticles;
