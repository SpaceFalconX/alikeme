import React from 'react'
import {render} from 'react-dom'
import {Router, Link, browserHistory, Route, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'

//components
import store, {history} from './store.js'
import MainWrapper from './components/MainWrapper.js'
import Signup from './components/Signup.js'
import Profile from './components/Profile.js'
import ProfileSetup from './components/ProfileSetup.js'
import Login from './components/Login.js'
import Browse from './components/Browse.jsx'
import Settings from './components/Settings.js'
import Navbar from './components/Navbar.js'

const Root = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={MainWrapper}>
				<IndexRoute component={Signup}></IndexRoute>
				<Route path='/login' component={Login} />
				<Route path='/setup/:username' component={ProfileSetup} />
				<Route path='/profile/:username' component={Profile} />
        <Route path='/browse/:username' component={Browse} />
				<Route path='/settings/:username' component={Settings} />
			</Route>
		</Router>
	</Provider>
)



render(Root, document.getElementById('app'))