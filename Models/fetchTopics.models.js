const db = require("../db/connection");

function fetchTopics(request, response) {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
}

module.exports = fetchTopics;
