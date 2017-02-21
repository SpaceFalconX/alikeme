'use strict'
import React from 'react'
import axios from 'axios'
// import Style from 'react-style-tag';
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import UserPic from './UserAvatar.js'
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
      height: '120px',
      borderRadius: '50%',
      margin: '20px',
      border: '2px, solid, #000',
    }

    const fontStyl = {
      fontSize: '10px',
      paddingBottom: '20px'
    }

    const locationStyl = {
      marginTop: '10px',
      fontSize: '16px'
    }

   const isAuthenticated = this.props.user.isAuthenticated;

   // <img src={this.state.profilePicture} style={imgStyle}/>

	 const loggedInView = (
        <div className="col-xs-2 sidebar">
          <h4 className="small-title hello"> Hello {this.props.user.username}!</h4>
          <UserPic username={this.props.user.username} style={imgStyle} />

           <p style={locationStyl}> <small> Current city: <strong>San Francisco, CA </strong></small> </p><br/>
          <h4 className="small-title"> My Personality Profile <small title="The normalized percentile score for the characteristic. The range is 0 to 100. For example, if the percentage for Openness is 25%, the author scored in the 25th percentile; the author is more open than 24% of the population and less open than 74% of the population."> </small> </h4>


          <div style={{width: +(this.props.user.openness * 100).toFixed(0) + '%'}}>
            <div className="statBar">
              <div style={{width: '500px'}}>
                <p><strong> Openness: </strong> { +(this.props.user.openness * 100).toFixed(0) || ' ' }%</p>
              </div>
            </div>
          </div>
          <div style={{width: +(this.props.user.conscientiousness * 100).toFixed(0) + '%'}}>
            <div className="statBar">
              <div style={{width: '500px'}}>
                <p><strong> Conscientiousness: </strong> { +(this.props.user.conscientiousness * 100).toFixed(0) || ' ' }%</p>
              </div>
            </div>
          </div>
          <div style={{width: +(this.props.user.extraversion * 100).toFixed(0) + '%'}}>
            <div className="statBar">
              <div style={{width: '500px'}}>
                <p><strong> Extraversion: </strong> { +(this.props.user.extraversion * 100).toFixed(0) || ' ' }%</p>
              </div>
            </div>
          </div>
          <div style={{width: +(this.props.user.emotionalRange * 100).toFixed(0) + '%'}}>
            <div className="statBar">
              <div style={{width: '500px'}}>
                <p><strong> Emotional range: </strong> { +(this.props.user.emotionalRange * 100).toFixed(0) || ' ' }%</p>
              </div>
            </div>
          </div>


        </div>
   )

   const noSideView = (
        <div style={{borderStyle: 'none'}}>
        </div>
   )

    return (
      <div>
        { isAuthenticated ? loggedInView : noSideView }
      </div>
    )
  }
})

export default Sidebar;




			    // <img src={this.state.profilePicture} style={imgStyle} onError={handleError} />
