const endpoints = require("../endpoints.json");

function getApi(request, response) {
  response.status(200).send({ endpoints });
}

module.exports = getApi;
