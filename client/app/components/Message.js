import React from 'react'
import PubNub from 'pubnub'
import { connect } from 'react-redux';
import * as actions from '../actions/chat_actions';
import { getMessages, getUsers, getLatestTimetoken } from '../reducers/chat'
import ChatUsers from './ChatUsers';

class Chat extends React.Component {

  componentDidMount () {
    const { currentChannel, addMessage, user, getActiveUsers, getChannels, params } = this.props;
    const { handlePresenceChange } = this;
    let id = user.username;
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
      channels: this.getChannelName(),
      withPresence: true,
    });

    this.pubnub.hereNow({
      channels: this.getChannelName(),
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

    this.fetchHistory(this.getChannelName());
    window.addEventListener('beforeunload', () => this.leaveChat());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.otheruser !== this.props.params.otheruser) {
      this.fetchHistory(this.getChannelName());
    }
  }

  getChannelName() {
    let mix = this.props.params.username + this.props.params.otheruser;
    let channels = [mix.split('').sort().join('')];
    return channels;
  }

  componentWillUnmount() {
    this.leaveChat();
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

  sendMessage (message) {
    this.pubnub.publish({
      channel: this.getChannelName(),
      message: message,
      storeInHistory: true,
    });
    // this.pubnub.publish({
    //   channel: this.props.params.otheruser,
    //   message: message,
    //   storeInHistory: true,
    // });
  }

  submitMessage (e) {
    e.preventDefault();
    const messageObj = {
      username: this.props.user.username,
      text: this.refs.message.value,
      timestamp: Date.now(),
    }
    console.log('SEND MESSAGE TO...',this.getChannelName())
    this.sendMessage(messageObj)
    this.refs.message.value = '';
    this.refs.message.focus();
  }


  fetchHistory(currentChannel) {
    const { props } = this;
    this.pubnub.history({
        channel: currentChannel,
        count: 10,
        stringifiedTimeToken: false,
        start: props.latestTimetoken,
      },
      function (status, resp) {
        const messages = resp.messages.map((message) => message.entry)
        console.log('currentChannel fetch hostroy', currentChannel, resp)
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
        this.fetchHistory(this.props.params.otheruser || this.props.params.username);
      }
    }

    if(!this.props.params.otheruser) {
      return (
        <div>
          <ChatUsers users={users} username={user.username} followers={this.props.followers} />
          <h4>Click on a user on the right to start your chat!</h4>
        </div>
      )
    }

    return (
      <div>
        <ChatUsers users={users} username={user.username} followers={this.props.followers} />
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
    this.pubnub.unsubscribeAll();
  }
}

Chat.defaultProps = {
  channels: ['LastTest'],
  messages: [],
  currentChannel: 'LastTest',
  latestTimetoken: null,
  users: [],
  followers: [],
}

const mapStateToProps = ({ chat, user }, ownProps) => {
  let mix = ownProps.params.username + ownProps.params.otheruser;
  let channel = mix.split('').sort().join('');
  return {
    user: user,
    messages: getMessages(chat, channel),
    latestTimetoken: getLatestTimetoken(chat),
    users: getUsers(chat),
    followers: user.followers,
  }
}

export default connect(mapStateToProps, actions)(Chat);
