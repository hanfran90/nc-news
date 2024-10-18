const updateVotes = require("../Models/updateVotes.models");

function patchArticleByArticleID(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  updateVotes(inc_votes, article_id)
    .then((updatedArticle) => {
      response.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = patchArticleByArticleID;
