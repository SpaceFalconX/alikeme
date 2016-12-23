var express = require('express');
var path = require('path')
var app = express();
var db = require('./database/config.js');

app.use(express.static('client'));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
})

app.listen(4000, function() {
	console.log("app running on port 4000")
})