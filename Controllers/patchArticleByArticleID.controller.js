const updateVotes = require("../Models/updateVotes.models");

function patchArticleByArticleID(request, response, next) {
  //   console.log(request.params);
  //   console.log(request.body);

  const { article_id } = request.params;
  const { inc_votes } = request.body;

  //   console.log(article_id, "<< article_id");
  //   console.log(inc_votes, "<< votes");

  updateVotes(inc_votes, article_id)
    .then((updatedArticle) => {
      console.log(updatedArticle, "<<< updated Article");
      response.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = patchArticleByArticleID;
