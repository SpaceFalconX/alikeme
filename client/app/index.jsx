import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './components/AwesomeComp.jsx';


class App extends React.Component {
  render () {
    return (
    	<div>
    		<p> yooooooo!</p>
    		<AwesomeComponent />
    	</div>
    )
  }
}

render(<App/>, document.getElementById('app'));
