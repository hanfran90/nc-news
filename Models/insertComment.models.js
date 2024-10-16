const db = require("../db/connection");

function insertComment(article_id, username, body) {
  const articleQuery = db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );

  const usernameQuery = db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);

  return Promise.all([articleQuery, usernameQuery])
    .then(([article, user]) => {
      if (article.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found - Article not found!",
        });
      }

      if (user.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found - Username not found!",
        });
      }

      return db.query(
        "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *",
        [article_id, username, body]
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = insertComment;