const db = require("../db/connection");

function fetchArticles() {
  return db
    .query(
      `SELECT articles.article_id,
      articles.title,
      articles.author,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
    COUNT (comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC`
    )
    .then((results) => {
      console.log(results.rows);
      return results.rows;
    });
}

module.exports = fetchArticles;
