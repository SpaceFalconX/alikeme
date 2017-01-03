import React from 'react';

class settings extends React.Component {
  render () {
    return (
      <div>
      settings
      			<h3> Configure social media accounts </h3>
						<h5> Twitter </h5>
						Enter your <span className="fa fa-twitter"> </span> handle: 	
						<input type="text" ref="twitter" placeholder="eg: janedoe"/> <br/>
						<h5> Facebook </h5>
						Enter your <span className="fa fa-facebook"> </span> username: 	
						<input type="text" ref="facebook" placeholder="eg: joedoe"/>
      </div>
    )
  }
}

export default settings