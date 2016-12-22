var express = require('express');
var db = require('./database/config.js')
var app = express();

app.use(express.static('client'));

app.listen(4000, function() {
	console.log("app running on port 4000...")
})