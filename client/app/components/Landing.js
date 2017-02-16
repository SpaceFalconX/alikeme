import React from 'react'
import {Link, browserHistory} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/auth_actions.js'
import {getWatsonTwitterData} from '../actions/watson_actions.js'

const Landing = React.createClass({
	render() {
		return (
      <div className="container-fluid">
        <div className="col-xs-6 boxed">
          <h2> Welcome to aLike.me </h2>
          <p className="lead"> Find people like you. </p>
          <Link to='/signup' className="btn btn-default linkto">Signup</Link>
          <Link to='/login' className="btn btn-default linkto">Login</Link>
          <Link to='/demo' className="btn btn-default linkto">Demo</Link>
        </div>
      </div>
		)
	}
})

export default Landing;
