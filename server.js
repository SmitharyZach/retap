const express = require("express");
const cors = require("cors");
const path = require("path");
var request = require("request");
require("dotenv").config();
const clientId = process.env.REACT_APP_CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const app = express();

app.use(express.json());

app.use(cors());
app.post("/login", (req, res) => {
  const code = req.body.code;
  const getAccessToken = `https://untappd.com/oauth/authorize/?client_id=${clientId}&client_secret=${clientSecret}&response_type=code&redirect_url=http://localhost:3000&code=${code}`;
  request(getAccessToken, function (error, response, body) {
    jsonBody = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      res.json(jsonBody);
    } else {
      res.json(error);
    }
  });
});

app.use(express.static(path.join(__dirname, "build")));
app.listen(process.env.PORT || 3001);
