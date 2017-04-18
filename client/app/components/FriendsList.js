import React from 'react'
import {browserHistory, Link} from 'react-router'
import {followClick} from '../actions/auth_actions.js'

const FriendsList = React.createClass({
  followUser(userId, matchId) {
    //console.log(this.props.match)
    console.log('THIS', this, userId, matchId)
    this.props.dispatch(followClick(userId, matchId))
  },

  visitProfile (e) {
    e.preventDefault()
    this.props.router.push(`/profile/${this.props.match.username}`)
  },

  render() {
    const style = {
      friendImg: {
        height:'50px',
        width:'50px'
      },
      panel: {
        color: '#333333',
        'backgroundColor': '#ffffff',
        'borderColor': '#e2e9e6'
      },
      panelFooter: {
        padding: '10px 15px',
        backgroundColor:' #ffffff',
        borderTop: '1px solid #e2e9e6',
        borderBottomRightRadius: '5%',
        borderBottomLeftRadius: '5%'
      },
      imgStyle: {
        height: '60px',
        width: '60px',
        borderRadius: '50%',
        border: '2px, solid, #000'
      }
    }
    const {username, distance, id} = this.props.match
    let route = this.props.router.getCurrentLocation().pathname


    const displayFollowers = (user, match) => {
      const isFollowing = user.following.find((followed) => followed.id === match.id);
      if(!isFollowing) {
        return (
          <div className="badge star-container follow-post not-following pull-right" ref="follower"
            onClick={() => this.followUser(user.id, match.id)}>
            <p className="star-text">Follow</p>
            <i className="glyphicon glyphicon-plus"></i>
            <i className="glyphicon glyphicon-user"></i>
            <p className="star-text emphasis"></p>
          </div>
        )
      } else {
        return (
          <div className="badge star-container follow-post following">
            <p className="star-text">Following</p>
            <i className="glyphicon glyphicon-user"></i>
            <p className="star-text emphasis"></p>
          </div>
        )
      }
    }

    return (
        <div className="col-lg-6">
          <div className="panel panel-default thumbnail" style={style.panel}>
            <div className="panel-heading">
              <div className="media">
                <div className="pull-left">
                  <img src={this.props.match.gravatar} className="media-object img-circle" style={style.imgStyle} />
                </div>
                <div className="media-body">
                  <h4 className="media-heading pull-left">
                    <Link onClick={this.visitProfile}> @{username}</Link>
                  </h4>
                  {this.props.user.openness === 0? <div></div>:
                    <div className="pull-right match-container setup">
                    <h4 className="media-heading match-text setup-text">
                      <a href="#">Match: {Math.abs(Math.round((1 - distance/5) * 100))}%</a>
                    </h4>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="panel-footer" style={style.panelFooter}>
              {displayFollowers(this.props.user, this.props.match)}
            </div>
          </div>
        </div>
    )
  }
})

export default FriendsList;
