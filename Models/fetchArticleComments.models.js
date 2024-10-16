const db = require("../db/connection");

function fetchArticleComments(article_id) {
  const query = `SELECT *
    FROM comments 
    WHERE article_id = $1`;
  return db.query(query, [article_id]).then((result) => {
    return result.rows;
  });
}
module.exports = fetchArticleComments;
