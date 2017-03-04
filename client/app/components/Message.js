import React from 'react'
import PubNub from 'pubnub'
import { connect } from 'react-redux';
import * as actions from '../actions/chat_actions';
import { getMessagesByChannel } from '../reducers'
import ChatUsers from './ChatUsers';

class Chat extends React.Component {

  componentDidMount () {
    console.log("Chat props:", this.props.messages);
    this.pubnub = new PubNub({
        publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
        subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
    });
    this.pubnub.addListener({
      message: this.props.addMessage
    });
    this.pubnub.subscribe({
      channels: ['AlikeMe Chat']
    });
  }

  sendMessage (message) {
    this.pubnub.publish({
      channel: 'AlikeMe Chat',
      message: message
    })
  }

  submitMessage (e) {
    e.preventDefault();
    const messageObj = {
      username: this.props.user.username,
      text: this.refs.message.value,
    }
    this.sendMessage(messageObj)
    this.refs.message.value = '';
    this.refs.message.focus();
  }

  handleScroll () {
    const { refs, props } = this;
    const scrollTop = refs.messageList.scrollTop;
    if (scrollTop === 0) {
      // props.fetchHistory();
    }
  }

  render () {

    const getTimestamp = () => {
      const messageDate = new Date();
      return messageDate.toLocaleDateString() +
      ' at ' + messageDate.toLocaleTimeString();
    }

    const { params, user, messages, history, location } = this.props;
    return (
      <div>
        <ChatUsers />
        <div className="row">
          <div className="col-lg-12 chat-feed">
            <div className="small-title">
              <p>Messaging {this.props.params.otheruser}</p>
            </div>
            <ul className="collection message-list" ref="messageList" onScroll={ this.handleScroll }>
              { messages.map((messageObj) => {
                const { timetoken, username, text } = messageObj;
                return (
                  <li className="collection-item message-item avatar" key={ timetoken }>
                    <img src={ location.state } alt={ username } className="circle" />
                    <span className="title">@{ username }</span>
                    <p>
                      <i className="prefix mdi-action-alarm" />
                      <span className="message-date">{ getTimestamp() }</span>
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
  channels: ['AlikeMe Chat'],
  messages: [],
  currentChannel: 'AlikeMe Chat',
}

const mapStateToProps = ({ chat }) => {
  return {
    messages: getMessagesByChannel(chat, 'AlikeMe Chat')
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
