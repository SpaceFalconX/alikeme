import React from 'react'
import {render} from 'react-dom'
import {Router, Link, browserHistory, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
//css
import Bootstrap from './bower_components/react-bootstrap/react-bootstrap.js';

//components
import store, {history} from './store.js'
import MainWrapper from './components/MainWrapper.js'	
import Signup from './components/Signup.js'
import Profile from './components/Profile.js'
import ProfileSetup from './components/ProfileSetup.js'


const Root = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={MainWrapper}>
				<IndexRoute component={Signup}></IndexRoute>
				<Route path="/setup/:username" component={ProfileSetup}></Route>
				<Route path="/profile/:username" component={Profile}></Route>
			</Route>
		</Router>
	</Provider>
)

render(Root, document.getElementById('app'))

// <Route path="/signup" component={Signup} />
