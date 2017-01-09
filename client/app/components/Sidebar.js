'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import { fetchUserDataFromWatson } from '../actions/refresh_stats'

const Sidebar = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
		let twitter = this.refs.twitter.value;
		let facebook = this.refs.facebook.value;
		let userData = {facebook, twitter}
    let options = { 
      screen_name: 'userData.twitter',
      include_rts: false,
      count: 100 
    }
    console.log({facebook, twitter} = userData)
		this.props.dispatch(fetchUserDataFromWatson(userData));
		this.refs.refreshForm.reset();
  },
  

  render () {

    const imgStyle = {
      height: '80px',
      width: '80px',
      borderRadius: '50%',
      border: '2px, solid, #000'
    }

    const fontStyl = {
      fontSize: '10px'
    }

    const locationStyl = {
      fontSize: '20px',
      marginTop: '10px'
    }

    return (
      <div className="col-md-2">
        <div style={fontStyl}>
          <img src="https://s-media-cache-ak0.pinimg.com/736x/ca/17/2e/ca172e61eb8d59a616730bef34276f7b.jpg" alt="hootington" style={imgStyle}/>
          <p className='lead' style={locationStyl}> <small> location set to: <br/> San Francisco, CA </small> </p>
          <h4> Stats <small title="The normalized percentile score for the characteristic. The range is 0 to 1. For example, if the percentage for Openness is 0.25, the author scored in the 25th percentile; the author is more open than 24% of the population and less open than 74% of the population."> *percentile </small> </h4>
          <p> Openness: 80% </p>
          <p> Conscientiousness: 80% </p> 
          <p> Introversion/Extraversion: 80% </p> 
          <p> Emotional range: 80% </p>  
        </div>
        <hr/>
        <h4 title="Click to refresh your stats based on what you've told us"> *Refresh Statics </h4> <br/>
        <form ref="refreshForm" onSubmit={this.handleSubmit}>
					<label>Twitter Handle:</label><br/>
					<input className="form-group" type="text" ref="twitter" placeholder="Twitter handle"/><br/>
          <label>Facebook Username:</label><br/>
					<input className="form-group" type="text" ref="facebook" placeholder="Facebook username"/><br/>
					<input className="btn btn-outline-success btn-sm" type="submit" value="Refresh"/>
				</form>
      </div>
    )
  }
}) 

export default Sidebar