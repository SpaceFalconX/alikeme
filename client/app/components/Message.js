import React from 'react'
import PubNub from 'pubnub'
import { connect } from 'react-redux';
import * as actions from '../actions/chat_actions';
import { getMessagesByChannel } from '../reducers'
import ChatUsers from './ChatUsers';

class Chat extends React.Component {

  componentDidMount () {
    // const { currentChannel, addMessage }
    // console.log("Messages", this.props.messages);
    this.pubnub = new PubNub({
        publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
        subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
    });
    this.pubnub.addListener({
      message: this.props.addMessage
    });
    this.pubnub.subscribe({
      channels: ['TestChannel2']
    });
    // this.fetchHistory(this.props.currentChannel);
  }

  sendMessage (message, currentChannel) {
    this.pubnub.publish({
      channel: currentChannel,
      message: message,
      storeInHistory: true,
    })
  }

  fetchHistory(currentChannel) {
    const { props } = this;
    console.log("here?",)
    this.pubnub.history({
        channel: 'TestChannel2',
        count: 15,
        stringifiedTimeToken: false,
        start: props.latestTimetoken,
      },
      function (status, resp) {
        console.log("HISTORY DATA:",status, resp)
        props.updateHistory(resp.messages, resp.startTimeToken, currentChannel);
      }
    );
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


  render () {
    // console.log("messages:", this.props.messages)
    console.log("latestTimetoken:", typeof this.props.latestTimetoken)
    const formatDate = (timestamp) => {
      const messageDate = new Date(timestamp);
      console.log("messageDate", messageDate, timestamp)
      return messageDate.toLocaleDateString() +
      ' at ' + messageDate.toLocaleTimeString();
    }

    const { params, user, messages, history, location } = this.props;

    const handleScroll = (e) => {
      e.preventDefault();
      const scrollTop = this.refs.messageList.scrollTop;
      if (scrollTop === 0) {
        console.log("AT 0")
        // this.fetchHistory(this.props.currentChannel);
      }
    }
    return (
      <div>
        <ChatUsers />
        <div className="row">
          <div className="col-lg-12 chat-feed">
            <div className="small-title">
              <p>Messaging {this.props.params.otheruser}</p>
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
}

Chat.defaultProps = {
  channels: ['TestChannel2'],
  messages: [],
  currentChannel: 'TestChannel2',
  latestTimetoken: null,
}

const mapStateToProps = ({ chat }) => {
  return {
    messages: getMessagesByChannel(chat, 'TestChannel2'),
    latestTimetoken: chat.latestTimetoken,
  }
}

export default connect(mapStateToProps, actions)(Chat);







// if(this.props.user.username === this.props.params.otheruser || !this.props.params.otheruser) {
//   return (
//     <div className="col-lg-9 feed">
//       <h1>Select a conversation</h1>
//     </div>
//   )
// }
