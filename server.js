var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

/*
 *  IMPORTANT:
 *  The GoogleMaps API is specifically restricted to HTTP requests from
 *  'http://localhost:3000/*'. So please let Sean know if the port is changed
 *  for whatever reason, so that the port can be changed in the API dashboard as well.
 */
var port = 3000;
/*
 * ~ ~ ~
 */

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {

  res.status(200).render('homepage', { homePage: true });

});

app.get('/about', function (req, res, next) {
  res.status(200).render('about');
});

app.post('/addPin', function(req, res, next) {
	if (req.body && req.body.lat && req.body.long && req.body.name) {
		console.log("Added following information");
		console.log("Name: ", req.body.name);
		console.log("Lat: ", req.body.lat);
		console.log("Long: ", req.body.long);

		//Add post data to data file
		res.status(200).send("Success");
		next();
	} else {
		res.status(400).send("ERROR");
	}
})

app.get('/importMap/:map_name', function (req, res, next) {

  var map_data_dir = fs.readdirSync('./data/');
  var map_file_name = req.params.map_name + '.json';

  var match_index = map_data_dir.indexOf(map_file_name);

  if (match_index != -1) {

    var importMap = require('./data/' + map_data_dir[match_index]);

    res.status(200).send(importMap);

  } else {

    res.status(404).send('File not found!');

  }

});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
