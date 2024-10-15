const db = require("../db/connection");

function fetchArticleId(article_id) {
  return db
    .query(
      `SELECT * FROM articles
    WHERE article_id = $1`,
      [article_id]
    )
    .then((result) => {
      if (result.rowCount < 1) {
        return Promise.reject({ status: 404, msg: "Not Found!" });
      } else return result.rows[0];
    });
}

module.exports = fetchArticleId;
