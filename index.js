const express = require("express");
require("./db");
const Routes = require("./routes");

const app = express();

app.use(express.json());

app.use(Routes);

app.listen(3000, () => {
  console.log("server is start listing on 3000");
});
