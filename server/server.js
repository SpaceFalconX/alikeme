var express = require('express');
var app = express();

app.use(express.static('client'));

app.listen(4000, function() {
	console.log("app running on port 4000...")
})