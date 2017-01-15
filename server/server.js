// MODULES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const webpack = require('webpack');

// DEPENDENCIES
const config = require('../webpack.config.js');
const db = require('./database/config.js');
const auth = require('./routes/auth_router.js');
const category =  require('./routes/category_router.js');
const post =  require('./routes/post_router.js');
const user =  require('./routes/user_router.js');
const star =  require('./routes/star_router.js');
const watson = require('./routes/watson_router.js')
const twitter = require('./routes/twitter_router.js')
const upload = require('./routes/upload_router.js')

// APP SETUP & MIDDLEWARE
const app = express();
 // app.all('*', function(req, res, next) {
 //    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
 //    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 //    res.header('Access-Control-Allow-Headers', 'Content-Type');
 //    if ('OPTIONS' == req.method) {
 //    res.sendStatus(200);
 //    } else {
 //      next();
 //    }
 //  });

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))

// ALL ROUTES
app.use('/auth', auth)
app.use('/api/watson', watson)
app.use('/api/category', category)
app.use('/api/post', post)
app.use('/api/user', user)
app.use('/api/star', star)
app.use('/api/twitter', twitter)
app.use('/api/upload', upload)

// WILD CARD - anything else direct to landing page
app.get('/', (req, res) => (
  res.sendFile(path.resolve(__dirname, '../client/app', 'index.html'))
));

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(4000, () => (
	console.log("App running on port 4000")
))