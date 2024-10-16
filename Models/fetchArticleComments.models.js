const db = require("../db/connection");

function fetchArticleComments(article_id) {
  const query = `SELECT *
    FROM articles 
    WHERE article_id = $1`;
  return db.query(query, [article_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found!" });
    } else {
      return db
        .query("SELECT * FROM comments WHERE article_id = $1", [article_id])
        .then((result) => {
          return result.rows;
        });
    }
  });
}
module.exports = fetchArticleComments;
