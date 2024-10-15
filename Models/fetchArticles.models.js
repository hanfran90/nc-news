const db = require("../db/connection");

function fetchArticles(request, response) {
  return db
    .query(
      ` SELECT articles.*,
    COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id`
    )
    .then((results) => {
      console.log(results.rows);
      return results.rows;
    });
}

module.exports = fetchArticles;
