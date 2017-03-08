import React from 'react'
import PubNub from 'pubnub'
import { connect } from 'react-redux';
import * as actions from '../actions/chat_actions';
import { getMessages, getUsers, getLatestTimetoken } from '../reducers/chat'
import ChatUsers from './ChatUsers';

class Chat extends React.Component {

  componentDidMount () {
    const { currentChannel, addMessage, user, getActiveUsers, getChannels } = this.props;
    const { handlePresenceChange } = this;
      // let id = user.username + Math.round(Math.random() * 1000000).toString();
      let id = user.username;
      console.log("ID on connection",id);
      this.pubnub = new PubNub({
          publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
          subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
          ssl: (location.protocol.toLowerCase() === 'https:'),
          uuid: id,
      });

      this.pubnub.addListener({
        message: addMessage,
        presence: handlePresenceChange
      });

      this.pubnub.subscribe({
        channels: [currentChannel],
        withPresence: true,
      });

      this.pubnub.hereNow({
        channels: [currentChannel],
        includeUUIDs: true,
        includeState: true
      }, function (status, response) {
          console.log('hereNow', response);
          getActiveUsers(response.channels);
      });

      this.pubnub.whereNow({
        uuid: id
      },  function (status, response) {
          console.log('whereNow',response);
      })

      this.fetchHistory(currentChannel);
      window.addEventListener('beforeunload', () => this.leaveChat(currentChannel));
  }

  componentWillUnmount() {
    this.leaveChat(this.props.currentChannel);
  }

  handlePresenceChange = (presence) => {
    console.log('presence', presence)
    const { addUserToChannel, removeUserFromChannel } = this.props;
    const { uuid, channel } = presence;
    switch (presence.action) {
    case 'join':
      addUserToChannel(uuid, channel)
      break;
    case 'leave':
      removeUserFromChannel(uuid, channel)
    case 'timeout':
      break;
    default:
      console.error('unknown action: ' + presenceData.action);
    }
  }

  sendMessage (message, currentChannel) {
    this.pubnub.publish({
      channel: currentChannel,
      message: message,
      storeInHistory: true,
    });
  }

  submitMessage (e) {
    e.preventDefault();
    const messageObj = {
      username: this.props.user.username,
      text: this.refs.message.value,
      timestamp: Date.now(),
    }
    this.sendMessage(messageObj, this.props.currentChannel)
    this.refs.message.value = '';
    this.refs.message.focus();
  }


  fetchHistory(currentChannel) {
    const { props } = this;
    this.pubnub.history({
        channel: 'LastTest',
        count: 10,
        stringifiedTimeToken: false,
        start: props.latestTimetoken,
      },
      function (status, resp) {
        const messages = resp.messages.map((message) => message.entry)
        props.updateHistory(messages, resp.startTimeToken, currentChannel);
      }
    );
  }

  render () {
    const formatDate = (timestamp) => {
      const messageDate = new Date(timestamp);
      return messageDate.toLocaleDateString() +
      ' at ' + messageDate.toLocaleTimeString();
    }

    const { params, user, messages, history, location, users } = this.props;

    const handleScroll = (e) => {
      e.preventDefault();
      const scrollTop = this.refs.messageList.scrollTop;
      if (scrollTop === 0) {
        this.fetchHistory(this.props.currentChannel);
      }
    }

    return (
      <div>
        <ChatUsers users={users} username={user.username} />
        <div className="row">
          <div className="col-lg-12 chat-feed">
            <div className="small-title">
              <p>Messaging {params.otheruser}</p>
            </div>
            <ul className="message-list" ref="messageList" onScroll={ handleScroll }>
              { messages.map((messageObj) => {
                const { timestamp, username, text } = messageObj;
                return (
                  <li className="collection-item message-item avatar" key={ timestamp }>
                    <img src={ location.state } alt={ username } className="circle" />
                    <span className="title">@{ username }</span>
                    <p>
                      <i className="prefix mdi-action-alarm" />
                      <span className="message-date">{ formatDate(timestamp) }</span>
                      <br />
                      <span>{ text }</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

          <footer className="chat-input">
            <form onSubmit={this.submitMessage.bind(this)}>
              <div className="row">
                <div className="col-sm-10">
                  <div className="input-container">
                    <input className="form-control" type="text" ref="message"
                    placeholder="Type here..."/>
                   <div className="detail">
                     <img src={ user.gravatar } className="chat-avatar" />
                     <span>@{ params.username }</span>
                   </div>
                 </div>
                </div>
                <div className="col-sm-2">
                  <button type="submit" className="btn btn-default glyphicon glyphicon-send send-message">
                  </button>
                </div>
              </div>
            </form>
          </footer>
      </div>
    )
  }

  leaveChat = (channel) => {
    this.pubnub.unsubscribe({ channels: [channel]});
  }
}

Chat.defaultProps = {
  channels: ['LastTest'],
  messages: [],
  currentChannel: 'LastTest',
  latestTimetoken: null,
  users: [],
}

const mapStateToProps = ({ chat, user }, ownProps) => {
  return {
    user: user,
    messages: getMessages(chat, ownProps.currentChannel),
    latestTimetoken: getLatestTimetoken(chat),
    users: getUsers(chat),
  }
}

export default connect(mapStateToProps, actions)(Chat);
