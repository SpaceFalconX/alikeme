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
import InterestMatch from './components/interests/InterestMatchComponent.jsx'
import InterestView from './components/interests/InterestViewComponent.jsx'
import Browse from './components/BrowseComponent.jsx'
import Navbar from './components/Navbar.js'

const Root = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={MainWrapper}>
				<IndexRoute component={Signup}></IndexRoute>
				<Route path="/login" component={Login} />
				<Route path="/setup/:username" component={ProfileSetup} />
				<Route path="/profile/:username" component={Profile} />
				<Route path='/editInterest/:id' component={InterestMatch} />
        <Route path='/viewInterest/:id' component={InterestView} />
        <Route path='/browse' component={Browse} />
			</Route>
		</Router>
	</Provider>
)

render(Root, document.getElementById('app'))