// server.js
var express  = require('express');
var app      = express();                           // create our app w/ express
app.use(express.static(__dirname + '/public'));
app.get('/api/gamedata', function(req, res) {
  var Converter = require("csvtojson").Converter;
  var converter = new Converter({});
  //end_parsed will be emitted once parsing finished
  converter.on("end_parsed", function (jsonArray) {
     res.send(jsonArray);
  });
  //read from file
  require("fs").createReadStream("./gamedata.csv").pipe(converter);
});
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
