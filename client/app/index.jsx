import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

import LandingComponent from './components/LandingComponent.jsx'
import SignInComponent from './components/SignInComponent.jsx'
import SignUpComponent from './components/SignUpComponent.jsx'
import SetUpComponent from './components/SetUpComponent.jsx'
import ProfileComponent from './components/ProfileComponent.jsx'

class App extends React.Component {
  render () {
    return (
    	<div>
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {LandingComponent} />
          <Route path='/signup' component={SignUpComponent} />
          <Route path='/signin' component={SignInComponent} />
          <Route path='/setup/:username' component={SetUpComponent} />
          <Route path='/profile/:username' component={ProfileComponent} />
          <Route path="*" component={LandingComponent} />
			  </Router>
		  </div>
    )
  }
}

//provider store = {store} app /provider
//let store = some imported reducer thing
render(<App/>, document.getElementById('app'));


