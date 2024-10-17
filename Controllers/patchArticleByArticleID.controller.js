const updateVotes = require("../Models/updateVotes.models");

function patchArticleByArticleID(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  if (!article_id) {
    return response.status(404).send({ msg: "Bad Request!" });
  }

  if (typeof inc_votes !== "number") {
    return response.status(400).send({ msg: "Bad Request!" });
  }

  updateVotes(inc_votes, article_id)
    .then((updatedArticle) => {
      response.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = patchArticleByArticleID;
