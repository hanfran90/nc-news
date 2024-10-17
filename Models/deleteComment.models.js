const db = require("../db/connection");

function deleteComment(comment_id) {
  const deleteQuery = `DELETE FROM comments WHERE comment_id = $1 RETURNING *`;

  return db.query(deleteQuery, [comment_id]).then((result) => {
    return result.rows[0];
  });
}

module.exports = deleteComment;
