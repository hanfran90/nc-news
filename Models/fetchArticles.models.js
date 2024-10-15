const db = require("../db/connection");

function fetchArticles(sort_by = "created_at") {
  return db
    .query(
      ` SELECT articles.*,
    COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC`
    )
    .then((results) => {
      return results.rows;
    });
}

module.exports = fetchArticles;
