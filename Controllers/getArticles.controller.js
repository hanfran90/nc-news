const fetchArticles = require("../Models/fetchArticles.models");

function getArticles(request, response, next) {
  const { sort_by, order, topic } = request.query;

  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      return response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getArticles;

//   if (articles.length === 0) {
//     return response
//       .status(404)
//       .send({ msg: "No articles found for that topic!" });
//   }
