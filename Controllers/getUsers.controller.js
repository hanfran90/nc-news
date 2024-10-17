const fetchUsers = require("../Models/fetchUsers.models");

function getUsers(request, response, next) {
  fetchUsers().then((users) => {
    response.status(200).send({ users });
  });
}

module.exports = getUsers;
