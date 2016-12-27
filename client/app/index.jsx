import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import reactDOM from 'react-dom'
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//reducers
import TestReducer from './reducers/testReducer.jsx'
//todo: make an allreducer export

//components
import LandingComponent from './components/LandingComponent.jsx'
import SignUpComponent from './components/SignUpComponent.jsx'
import SetUpComponent from './components/SetUpComponent.jsx'
import ProfileComponent from './components/ProfileComponent.jsx'
import TestContainer from './components/TestContainer.jsx'
//todo: make an allcomponent export

const store = createStore(TestReducer, applyMiddleware(thunk)); //reducers as parameter

class App extends React.Component {
  render () {
    return (
    	<div>
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {LandingComponent} />
          <Route path='/signup' component={SignUpComponent} />
          <Route path='/setup' component={SetUpComponent} />
          <Route path='/profile/:username' component={ProfileComponent} />
          <Route path='/test' component={TestContainer} />
          <Route path="*" component={LandingComponent} />
			  </Router>
		  </div>
    )
  }
}

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app'));


