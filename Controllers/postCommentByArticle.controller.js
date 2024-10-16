const insertComment = require("../Models/insertComment.models");

function postCommentByArticle(request, response, next) {
  const { username, body } = request.body;
  const { article_id } = request.params;

  if (!username || !body) {
    return response
      .status(400)
      .send({ msg: "Bad Request - missing username and/or body!" });
  }

  if (typeof body !== "string") {
    return response
      .status(400)
      .send({ msg: `Bad Request - 'body' must be a string!` });
  }
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = postCommentByArticle;
