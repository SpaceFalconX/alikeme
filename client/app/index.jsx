import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import AwesomeComponent from './components/AwesomeComp.jsx';

class App extends React.Component {
  render () {
    return (

    	<div>
    		<p> wtf </p>
    		// <AwesomeComponent />
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {Home} />
			    <Route path='/bigdogs' component={AwesomeComponent} />
			  </Router>
		  </div>
    )
  }
}

const Home = () => <h1>Hello from Home!</h1>


render(<App/>, document.getElementById('app'));


