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
          // <img src={require('../../../server/profile_pictures/' + 'test3' + '.jpg')} alt="hootington" style={imgStyle}/>
          //WORKS, BUT REBUNDLES ON EVERY NEW UPLOAD
          //rewire to a server find/send?
    return (
      <div className="col-md-2">
        <div className="sidebar" style={fontStyl}>
          <img src='#' alt="hootington" style={imgStyle}/>
          <p className='lead' style={locationStyl}> <small> location set to: <br/> San Francisco, CA </small> </p>
          <h4> Stats <small title="The normalized percentile score for the characteristic. The range is 0 to 1. For example, if the percentage for Openness is 0.25, the author scored in the 25th percentile; the author is more open than 24% of the population and less open than 74% of the population."> *percentile </small> </h4>
          <p> Openness: {(this.props.user.openness * 100).toFixed(0)}% </p>
          <p> Conscientiousness: {(this.props.user.conscientiousness * 100).toFixed(0)}% </p>
          <p> Introversion/Extraversion: {(this.props.user.extraversion * 100).toFixed(0)}% </p>
          <p> Emotional range: {(this.props.user.emotionalRange * 100).toFixed(0)}% </p>
        </div>
        <hr/>
      </div>
    )
  }
})

export default Sidebar