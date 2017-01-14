import React from 'react'
import {browserHistory, Link} from 'react-router'
import {followClick} from '../actions/auth_actions.js'
import UserPic from './userPicture.js'


const FollowThumb = React.createClass({
  visitProfile (e) {
    e.preventDefault()
    this.props.router.push(`/profile/${this.props.follower.username}`)
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
    // const {otherUser} = this.props.otherUser;
    const {follower} = this.props;
    return (
          <div className="thumbnail" style={style.panel}>
            <div className="panel-heading">
              <div className="media">
                <div className="pull-left">
                <UserPic username={follower.username} className="media-object img-circle" style={style.friendImg} />
                </div>
                <div className="media-body">
                  <h5 className="media-heading margin-v-5 pull-left">
                    <Link onClick={this.visitProfile}>@{follower.username}</Link>
                  </h5>
                  <br/>
                  <div className="pull-left">
                    <span><i className="fa fa-users"></i> 372 </span>
                    <span><i className="fa fa-photo"></i> 43 </span>
                    <span><i className="fa fa-video-camera"></i> 3 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
  }
})

export default FollowThumb;






