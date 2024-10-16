const insertComment = require("../Models/insertComment.models");

function postCommentByArticle(request, response, next) {
  const { username, body } = request.body;
  const { article_id } = request.params;

  insertComment(article_id, username, body).then((comment) => {
    response.status(201).send({ comment });
  });
}

module.exports = postCommentByArticle;
