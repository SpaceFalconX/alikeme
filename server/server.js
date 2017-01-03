// MODULES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const webpack = require('webpack');
const Twit  = require('twit')

// DEPENDENCIES
const config = require('../webpack.config.js');
const db = require('./database/config.js');
const auth = require('./routes/auth_router.js');
const user =  require('./routes/user_router.js');
const twitter = require('./config/twitter.js')
const category =  require('./routes/category_router.js');
const post =  require('./routes/post_router.js');
// const tag =  require('./routes/tag_router.js');


// APP SETUP & MIDDLEWARE
const app = express();
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


// ALL ROUTES
app.use('/auth', auth)
app.use('/api', category)
app.use('/api', post)
// app.use('/api', user)


// WILD CARD - anything else direct to landing page 
app.get('*', (req, res) => (
  res.sendFile(path.resolve(__dirname, '../client/app', 'index.html'))
));

app.listen(4000, () => (
	console.log("App running on port 4000")
))

// TWITTER API
const T = new Twit(twitter)
const options = { 
	screen_name: 'guardian',
  count: 5 
}

T.get('statuses/user_timeline', options, (err, data) => {
	if (err) {
		console.error('There was an error with the Twitter API')
	}
	 for (var i = 0; i < data.length ; i++) {
	  console.log('inside twiiittteeer =>', i) //deleteME
    console.log(data[i].text); //deleteME
  }
})









