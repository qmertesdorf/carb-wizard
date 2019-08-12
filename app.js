var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require("body-parser"),
  axios = require("axios");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.post("/carbs", function(req, res) {
  axios.request({
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    method: "POST",
    headers: {
      "x-app-id": "5cdae105",
      "x-app-key": "deb0d2e28997abff65ae692e5c1dc034",
      "content-type": "application/json",
      "cache-control": "no-cache"
    },
    // data: '{\r\n "query":"' + req.body + '",\r\n "timezone": "US/Eastern"\r\n}'
    data: { query: req.body.query, timezone: "US/Eastern" }
  }).then(response => {
      const totalCarbs = response.data.foods.reduce(function(acc, nextVal) {
        return acc + nextVal.nf_total_carbohydrate
      }, 0);
      res.send({totalCarbs}).status(200);
    console.log(response.data);
    console.log(req.body);
  }).catch(err => {
    console.log(err);
  });
});

app.listen(port, function() {
  console.log("App is running on port: ", port);
});