const express = require('express');
const path = require('path')
var webpack = require('webpack');
var config = require('../webpack.config.js');

const bodyParser = require('body-parser');
const morgan = require('morgan')
// const db = require('./database/config.js');
const router = require('./router.js')
const app = express();
var compiler = webpack(config);


// MIDDLEWARE FUNCTIONS
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


// ALL ROUTES
app.use(router)

// WILD CARD - anything else direct to landing page
app.get('*', (req, res) => (
  res.sendFile(path.resolve(__dirname, '../client/app', 'index.html'))
))


app.listen(4000, () => (
	console.log("app running on port 4000")
))
