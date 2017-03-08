import React from 'react';

const ChatUsers = (props) => {
  console.log("PROPS", props.users)
  return (
    <div className="sidebar-wrapper chat-left">
      <div className="sidebar-content chat-left-content">
        <h4>Online Users</h4>
        {
          props.users.map((user, index) => (
            <div key={user}>
              <span style={{fontSize: 14, padding: 10, fontWeight: 600}}>{user}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default ChatUsers;
