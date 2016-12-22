import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import AwesomeComponent from './components/AwesomeComp.jsx';


class App extends React.Component {
  render () {
    return (
  <Router history = {browserHistory}>
    <Route path={"/"}component={AwesomeComponent}>
      <Route path={'/bigdogs'} component={AwesomeComponent} />
    </Route>
  </Router>
    )
  }
}

render(<App/>, document.getElementById('app'));


