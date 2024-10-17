const deleteComment = require("../Models/deleteComment.models");

function deleteCommentByID(request, response, next) {
  const { comment_id } = request.params;

  if (isNaN(comment_id)) {
    return response.status(400).send({ msg: "Invalid comment ID!" });
  }

  deleteComment(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = deleteCommentByID;
