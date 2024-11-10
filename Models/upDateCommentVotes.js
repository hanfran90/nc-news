const db = require("../db/connection.js");

function updateCommentVotes(inc_votes, comment_id) {
  const updateVotesQuery = `UPDATE comments 
    SET votes = votes + $1 
    WHERE comment_id = $2
    RETURNING *;`;

  return db
    .query(updateVotesQuery, [inc_votes, comment_id])

    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found!" });
      }
      return result.rows[0];
    });
}

module.exports = updateCommentVotes;
