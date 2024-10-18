const db = require("../db/connection.js");

function updateVotes(inc_votes, article_id) {
  const updateVotesQuery = `UPDATE articles 
  SET votes = votes + $1 
  WHERE article_id = $2
  RETURNING *;`;

  return db
    .query(updateVotesQuery, [inc_votes, article_id])

    .then((result) => {
      return result.rows[0];
    })
}

module.exports = updateVotes;
