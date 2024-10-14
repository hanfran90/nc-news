const fetchTopics = require("../Models/fetchTopics.models");

function getTopics(request, response, next) {
  fetchTopics().then((topics) => {
    response.status(200).send({
      topics
    });
  });
}

module.exports = getTopics;
