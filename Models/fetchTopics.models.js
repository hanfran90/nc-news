const db = require("../db/connection");

function fetchTopics(request, response, next) {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
}

module.exports = fetchTopics;
