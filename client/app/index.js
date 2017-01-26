import React from 'react'
import {render} from 'react-dom'
import {Router, Link, browserHistory, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
require('../stylesheets/stylesheet.css')

//components
import store, {history} from './store.js'
import MainWrapper from './components/MainWrapper.js'
import Signup from './components/Signup.js'
import Profile from './components/Profile.js'
import PublicProfile from './components/PublicProfile.js'
import ProfileSetup from './components/ProfileSetup.js'
import Login from './components/Login.js'
import Browse from './components/Browse.jsx'
import Matches from './components/Matches.js'
import Settings from './components/Settings.js'
import Navbar from './components/Navbar.js'
import Message from './components/Message.js'
import Sidebar from './components/Sidebar.js'

const Root = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={MainWrapper}>
				<IndexRoute component={Signup}></IndexRoute>
				<Route path='/login' component={Login} />
				<Route path='/message/:username(/:user)' component={Message} />
				<Route path='/setup/:username' component={ProfileSetup} />
				<Route path='/settings/:username' component={Settings} />
				<Route path='/profile/:username' component={PublicProfile} />
        <Route path='/browse/:username(/:category)' component={Browse} />
				<Route path='/matches/:postid' component={Matches} />
				<Route path='/editProfile/:username' component={Settings} />
				<Route path='/:username' component={Profile} />
			</Route>
		</Router>
	</Provider>
)

render(Root, document.getElementById('app'))