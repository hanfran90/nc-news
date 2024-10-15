const fetchArticles = require("../Models/fetchArticles.models");

function getArticles(request, response) {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

module.exports = getArticles;
