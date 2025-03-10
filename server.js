const userData = require("./userData");
const chartData = require("./chartData");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.post("/login", bodyParser.json(), (req, res) => {
  const { login, password } = req.body;
  if (login !== userData.login || password !== userData.password) { 
    return res.sendStatus(400);
  }
  res.sendStatus(200);
});

app.get("/chart", (req, res) => {
  try {
    res.status(200).send(chartData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/logout", (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
