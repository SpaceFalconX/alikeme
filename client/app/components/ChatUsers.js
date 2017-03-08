import React from 'react';
import {Link} from 'react-router';

const ChatUsers = (props) => {
  return (
    <div className="sidebar-wrapper chat-left">
      <div className="sidebar-content chat-left-content">
        <h4>Online Users</h4>
        {
          props.users.map((otheruser, index) => (
            <div key={otheruser}>
              <span style={{fontSize: 14, padding: 10, fontWeight: 600}}>{otheruser}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default ChatUsers;
