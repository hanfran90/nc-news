const fetchArticleId = require("../Models/fetchArticleId.models");

function getArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchArticleId(article_id)
    .then((article) => {
      response.status(200).send({
        article,
      });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticleId;
