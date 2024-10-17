const db = require("../db/connection");

function fetchArticles(sort_by = "created_at", order = "desc") {
  const validSortBys = [
    "article_id",
    "title",
    "author",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrders = ["asc", "desc"];

  let queryStr = `SELECT articles.article_id,
  articles.title,
  articles.author,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
COUNT (comments.article_id) AS comment_count
FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id`;

  if (!validSortBys.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Invalid sort_by!",
    });
  }

  queryStr += ` ORDER BY ${sort_by} ${order}`;

  return db.query(queryStr).then((results) => {
    return results.rows;
  });
}

module.exports = fetchArticles;
