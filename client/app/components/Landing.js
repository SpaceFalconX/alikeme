import React from 'react'
import {Link, browserHistory} from 'react-router'
import {signupApiRequest, signupUser} from '../actions/auth_actions.js'
import {getWatsonTwitterData} from '../actions/watson_actions.js'

const Landing = React.createClass({
	render() {
		return (
      <div className="jumbotron boxed landing">
        <div className="container-fluid">
          <h1> Welcome to aLike.me! </h1>
          <p> Find people like you. </p>
          <div className="padded-box">
            <Link to='/signup' className="btn btn-default linkto">Signup now!</Link>
            <Link to='/demouser' className="btn btn-default linkto demo">Demo app</Link>
          </div>
          <div className="padded-box">
            <p>Already have an account?
              <Link to='/login'> Go to Login </Link>
            </p>
          </div>
        </div>
      </div>
		)
	}
})

export default Landing;
