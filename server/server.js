// MODULES
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const webpack = require('webpack');

// DEPENDENCIES
const config = require('../webpack.config.js');
const db = require('./database/config.js');
const seed = require('./database/seed.js');
const auth = require('./routes/auth_router.js');
const user =  require('./routes/user_router.js');


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
app.use('/api', user)


// WILD CARD - anything else direct to landing page 
app.get('*', (req, res) => (
  res.sendFile(path.resolve(__dirname, '../client/app', 'index.html'))
));


// SEED DB & DISABLE FORIEGN KEY CONSTRAINTS
db.connection.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
.then(() => { 
	db.connection.sync({force: true})
	.then(() => {
		seed(db)
		.then(() => {
			console.log("App connected to DB") 
			app.listen(4000, () => (
				console.log("App running on port 4000")
			))
		})
		.catch((err) => { console.log(err)})
	})
});


// db.connection.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
// .then(() => { 

// 	db.connection.sync()
// 	.then(() => {
// 		console.log("App connected to DB") 
// 		app.listen(4000, () => (
// 			console.log("App running on port 4000")
// 		))
// 	})
// 	.catch((err) => { console.log(err)})
	
// })





