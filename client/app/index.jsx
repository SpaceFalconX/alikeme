import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, hashHistory, IndexRoute} from "react-router";
import AwesomeComponent from './components/AwesomeComp.jsx';


class App extends React.Component {
  render () {
    return (
  <Router history = {hashHistory}>
    <Route path={'/bigdogs'} component={AwesomeComponent} />
  </Router>
    )
  }
}

render(<App/>, document.getElementById('app'));


