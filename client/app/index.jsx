import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import AwesomeComponent from './components/AwesomeComp.jsx';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";


class App extends React.Component {
  render () {
    return (
<<<<<<< HEAD
  <Router history = {hashHistory}>
    <Route path={'/bigdogs'} component={AwesomeComponent} />
  </Router>
=======
    	<div>
    		<p> wtf </p>
    		// <AwesomeComponent />
	  	  <Router history = {browserHistory}>
			    <Route path='/' component= {Home} />
			    <Route path='/bigdogs' component={AwesomeComponent} />
			  </Router>
		  </div>
>>>>>>> 3ce8aa62de604b0b26c867cb4c84521d20eaec19
    )
  }
}

const Home = () => <h1>Hello from Home!</h1>


render(<App/>, document.getElementById('app'));


