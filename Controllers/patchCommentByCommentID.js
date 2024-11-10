const updateCommentVotes = require("../Models/upDateCommentVotes");

function patchCommentByCommentID(request, response, next) {
  const { comment_id } = request.params;
  const { inc_votes } = request.body;

  if (typeof inc_votes !== "number" || isNaN(inc_votes)) {
    return response.status(400).send({ msg: "Invalid value for inc_votes!" });
  }

  updateCommentVotes(inc_votes, comment_id)
    .then((updatedComment) => {
      response.status(200).send({ updatedComment });
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = patchCommentByCommentID;
