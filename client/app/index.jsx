import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import BigDogComponent from './components/BigDogComp.jsx';
import HomeComponent from './components/HomeComp.jsx';

class App extends React.Component {
  render () {
    return (

    	<div>
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {HomeComponent}>
            <Route path='/bigdogs' component={BigDogComponent} />
          </Route>
			  </Router>
		  </div>
    )
  }
}


render(<App/>, document.getElementById('app'));


