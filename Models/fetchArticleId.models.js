const db = require("../db/connection");

function fetchArticleId(article_id) {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count 
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id 
      WHERE articles.article_id = $1 
      GROUP BY articles.article_id`,
      [article_id]
    )
    .then((result) => {
      if (result.rowCount < 1) {
        return Promise.reject({ status: 404, msg: "Not Found!" });
      } else return result.rows[0];
    });
}

module.exports = fetchArticleId;
