'use strict'
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import fetchUserPicture from '../utils/fetchUserPicture.js'

const Sidebar = React.createClass({
  componentWillMount () {
      this.setState({profilePicture: null})
  },

  componentWillReceiveProps (nextProps) {
      fetchUserPicture(nextProps.user.username).then((res) => {
        this.setState({profilePicture: res.data})
      })
  },

  render () {

    fetchUserPicture(this.props.user.username)

    this.state = {
      profilePicture: 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.user.username + '.jpg'
    }
    
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
      marginTop: '10px',
      fontSize: '16px'
    }

   const isAuthenticated = this.props.user.isAuthenticated;

	 const loggedInView = (
			<div className="col-md-2">
        <div style={fontStyl}>
          <h3> Hello {this.props.user.username}!</h3>
           <p style={locationStyl}> <small> location set to: <br/> San Francisco, CA </small> </p>
          <h4> Stats <small title="The normalized percentile score for the characteristic. The range is 0 to 100. For example, if the percentage for Openness is 25%, the author scored in the 25th percentile; the author is more open than 24% of the population and less open than 74% of the population."> *%percentile </small> </h4>
          <p> <strong> Openness: </strong> { +(this.props.user.openness * 100).toFixed(0) || ' ' }% </p>
          <p> <strong> Conscientiousness: </strong> {  +(this.props.user.conscientiousness * 100).toFixed(0)  || ' ' }% </p>
          <p> <strong> Introversion/Extraversion: </strong> {  +(this.props.user.extraversion * 100).toFixed(0) || ' ' }% </p>
          <p> <strong> Emotional range: </strong> { +(this.props.user.emotionalRange * 100).toFixed(0) || ' ' }% </p>
        </div>
      </div>
   )

   const noSideView = (
      <div className="col-md-2">
        <div className="jumbotron">
          WELCOME TO aLike.me

        </div>
      </div>
   )


    return (
      <div> { isAuthenticated ? loggedInView : '' } </div>
    )
  }
})

export default Sidebar;




			    // <img src={this.state.profilePicture} style={imgStyle} onError={handleError} />
