import React from 'react'
import {browserHistory, Link} from 'react-router'

const FriendsList = React.createClass({
  onClick(e) {
    e.preventDefault();
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
        borderBottomRightRadius: '-1',
        borderBottomLeftRadius: '-1'
      }
    }
    return (
      <div >
        <div className="col-md-3">
          <div className="panel panel-default" style={style.panel}>
            <div className="panel-heading">
              <div className="media">
                <div className="pull-left">
                  <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="people" className="media-object img-circle"
                    style={style.friendImg} />
                </div>
                <div className="media-body">
                  <div>
                  <h4 className="media-heading margin-v-5 pull-left"><a href="#">{this.props.match.match}</a></h4>
                  <h4 className="media-heading margin-v-5 pull-right"><a href="#">{this.props.match.distance}</a></h4>

                  </div>
                  <div className="profile-icons">
                    <span><i className="fa fa-users"></i> 372</span>
                    <span><i className="fa fa-photo"></i> 43</span>
                    <span><i className="fa fa-video-camera"></i> 3</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer" style={style.panelFooter}>
              <a href="#" className="btn btn-default btn-sm">Follow <i className="fa fa-share"></i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default FriendsList;






