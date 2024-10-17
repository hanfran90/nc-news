const fetchArticleComments = require("../Models/fetchArticleComments.models");

function getArticleComments(request, response, next) {
  const { article_id } = request.params;

  fetchArticleComments(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticleComments;
