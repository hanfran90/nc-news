const app = require("./app.js");

app.listen(5678, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on 5678");
  }
});
