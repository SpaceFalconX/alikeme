'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
//import { fetchUserDataFromWatson } from '../actions/refresh_stats'

const Sidebar = React.createClass({
  // constructor(props) {
  //   //super()
  //   // this.state = {
  //   //   profilePicture: () => {
  //   //     return 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.user.username + '.jpg'
  //   //   }
  //   // }
  // },

  // handleSubmit(e) {
  //   e.preventDefault();
	// 	let twitter = this.refs.twitter.value;
	// 	let facebook = this.refs.facebook.value;
	// 	let userData = {facebook, twitter}
  //   let options = {
  //     screen_name: 'userData.twitter',
  //     include_rts: false,
  //     count: 100
  //   }
  //   console.log({facebook, twitter} = userData)
	// 	this.props.dispatch(fetchUserDataFromWatson(userData));
	// 	this.refs.refreshForm.reset();
  // },
  // componentWillMount () {
  //   // this.state = {
  //   //   profilePicture: 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.user.username + '.jpg'
  //   // }
  // },

  render () {
    // this.state = {
    //   profilePicture: 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.user.username + '.jpg'
    // }

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

    // const handleError = () => {
    //   this.setState({profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"})
    // }

   const isAuthenticated = this.props.user.isAuthenticated;

	 const loggedInView = (
			<div className="col-md-2">
        <div style={fontStyl}>
			    <img src={this.state.profilePicture} style={imgStyle} onError={handleError} />
          <p> <h3> Hello {this.props.user.username}!</h3> </p>
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
      <div>	{ isAuthenticated ? loggedInView : '' } </div>
    )
  }
})

export default Sidebar;




