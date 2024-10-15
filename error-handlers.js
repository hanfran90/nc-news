exports.psqlErrorHandler = ((err, request, response, next) => {
    if (err.code === "22P02") {
      response.status(400).send({ msg: "Invalid data type!" });
    }
    next(err);
  });
  
exports.customErrorHandler = ((err, request, response, next) => {
    if (err.status && err.msg) {
      response.status(err.status).send({ msg: err.msg });
    }
    next(err);
  });

exports.serverErrorHandler = ((err, request, response) => {
    response.status(500).send({ msg: "500 server error" });
  });