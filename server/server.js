const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const db = require('./database/config.js');
const app = express();

// MIDDLEWARE FUNCTIONS
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.get('/test', function (request, response){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
})

app.get('/api/what', function(req, res){
  console.log("its here")
  res.send("asfasfasdfasdf")
})

app.listen(4000, function() {
	console.log("app running on port 4000")
})
