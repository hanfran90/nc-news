const db = require("../db/connection.js");

function updateVotes(inc_votes, article_id) {
  const updateVotesQuery = `UPDATE articles 
  SET votes = votes + $1 
  WHERE article_id = $2
  RETURNING *;`

  return db
    .query(updateVotesQuery, [inc_votes, article_id])

    .then((result) => {
      console.log(result.rows[0], "<<< result.rows");
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = updateVotes;
