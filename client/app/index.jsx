import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import BigDogComponent from './components/BigDogComp.jsx';
import HomeComponent from './components/HomeComp.jsx';
import FerretsComponent from './components/FerretsComp.jsx';
import BabyFerretsComponent from './components/BabyFerretsComp.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {HomeComponent}>
            <Route path='/bigdogs' component={BigDogComponent} />
              <Route path='/ferrets' component={FerretsComponent}>
                <Route path='/babyferrets' component={BabyFerretsComponent} />
              </Route>
          </Route>
          <Route path="*" component={HomeComponent} />
			  </Router>
		  </div>
    )
  }
}


render(<App/>, document.getElementById('app'));


