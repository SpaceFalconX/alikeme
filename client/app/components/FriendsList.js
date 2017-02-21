import React from 'react'
import {browserHistory, Link} from 'react-router'
import {followClick} from '../actions/auth_actions.js'
import UserPic from './UserAvatar.js'

const FriendsList = React.createClass({
  followUser(e) {
    console.log(e)
    e.preventDefault();
    console.log(this.props.match)
    this.props.dispatch(followClick(this.props.user.id, this.props.match.id))
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
      }
    }
    const {username, distance} = this.props.match
    let route = this.props.router.getCurrentLocation().pathname
    // <div className="profile-icons">
    //   <span><i className="fa fa-users"></i> 372</span>
    //   <span><i className="fa fa-photo"></i> 43</span>
    //   <span><i className="fa fa-video-camera"></i> 3</span>
    // </div>
    //<img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="people" className="media-object img-circle" style={style.friendImg} />
    // const followButton = (<button ref="follower" className="btn btn-default" onClick={this.followUser}>Follow <i className="fa fa-share"></i></button>)
    return (
      <div  className="">
        <div className="col-md-6">
          <div className="panel panel-default thumbnail" style={style.panel}>
            <div className="panel-heading">
              <div className="media">
                <div className="pull-left">
                  <UserPic username={username} />
                </div>
                <div className="media-body">
                  <h4 className="media-heading margin-v-5 pull-left">
                    <Link onClick={this.visitProfile}> Match: {username}</Link>
                  </h4>
                  <h4 className="media-heading margin-v-5 pull-right">
                    <a href="#">{Math.abs(Math.round((1 - distance/5) * 100))}%</a>
                  </h4>
                </div>
              </div>
            </div>
            <div className="panel-footer" style={style.panelFooter}>
            <button ref="follower" className="btn btn-default" onClick={this.followUser}>Follow <i className="fa fa-share"></i></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default FriendsList;
