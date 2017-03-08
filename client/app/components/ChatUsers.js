import React from 'react';
import {Link} from 'react-router';

const ChatUsers = (props) => {
  return (
    <div className="sidebar-wrapper chat-left">
      <div className="sidebar-content chat-left-content">
        <div>
          <h4>Online Users</h4>
          {
            props.users.filter((otheruser, index) => (
              otheruser !== props.username
            )).map((otheruser) =>
              <div key={otheruser}>
                <Link className="chat-user" to={`/message/${props.username}/${otheruser}`}>
                  <span style={{fontSize: 14, padding: 10, fontWeight: 600}}>{otheruser}</span>
                </Link>
              </div>
            )
          }
        </div>
        <div>
          <h4>Your followers</h4>
          {
            props.followers.map((otheruser, index) => (
              <div key={otheruser.username}>
                <Link className="chat-user" to={`/message/${props.username}/${otheruser.username}`}>
                  <span style={{fontSize: 14, padding: 10, fontWeight: 600}}>{otheruser.username}</span>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};


export default ChatUsers;
