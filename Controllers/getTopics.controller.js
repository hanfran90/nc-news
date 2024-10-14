const fetchTopics = require("../Models/fetchTopics.models");

function getTopics(request, response, next) {
  console.log("Hello from topic controller");
  fetchTopics();
}

module.exports = getTopics;
