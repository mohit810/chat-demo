var express = require("express");
const app = express();
const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
