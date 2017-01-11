import React from 'react'
import {browserHistory, Link} from 'react-router'
import {followClick} from '../actions/auth_actions.js'


const FollowThumb = React.createClass({
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
    // const {otherUser} = this.props.otherUser;
    const {username} = this.props.follower
    return (
      <div className="container">
        <div className="col-md-4">
          <div className="thumbnail" style={style.panel}>
            <div className="panel-heading">
              <div className="media">
                <div className="pull-left">
                  <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="people" className="media-object img-circle"
                    style={style.friendImg} />
                </div>
                <div className="media-body">
                  <h4 className="media-heading margin-v-5 pull-left">
                    <Link onClick={this.visitProfile}>@{username}</Link>
                  </h4>
                  <h4 className="media-heading margin-v-5 pull-right">
                    <strong>{Math.round((1 - 10) * 100)}% alike me</strong>
                  </h4>
                  <br/>
                  <div className="pull-left">
                    <span><i className="fa fa-users"></i> 372</span>
                    <span><i className="fa fa-photo"></i> 43</span>
                    <span><i className="fa fa-video-camera"></i> 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
  }
})

export default FollowThumb;






