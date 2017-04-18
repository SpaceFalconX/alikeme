import React from 'react'
import PubNub from 'pubnub'
import {clearTags} from '../actions/tag_actions.js'
import {browserHistory} from 'react-router'

class Message extends React.Component {
  constructor(props) {
    super()
    this.state = { //TODO- MOVE ALL TO STORE
      messageHistory: [<div key='loading'> LOADING </div>],
      usersHistory: [<div key='loadingHistory'> LOADING </div>],
      usersHistory_names: null,
      channelName: null,
      historyChannel: null
    }
  }

  componentWillMount () {
    this.setState({channelName: [this.props.params.otheruser, this.props.params.username].sort().join("")})
    this.setState({historyChannel: this.props.params.username + 'history'})
  }

  componentDidMount () { //init pubnub
    console.log("PROPS", this.props, this.pubnub);
    console.log("STATE", this.state);
    this.pubnub = new PubNub({
        publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
        subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
    })
    this.pubnub.addListener({
      message: (m) => {
        console.log("HANDLE NEW MESSAGE", m)
        this.handleNewMessage(m.message)
      }
    })
    this.pubnub.subscribe({
      channels: [this.state.channelName]
    })
    this.refresh()
  }

  componentWillUnmount () {
    this.pubnub.unsubscribeAll()
  }


  handleNewMessage (message) { //for listener
    //concat new messages to state
    let temp = this.state.messageHistory
    .concat([ //EXTERNALIZE TO AN ENTRY
      <div key={Math.random()}>
        {message.text}
      </div>
    ])
    if(temp.length > 9) {
      temp = temp.slice(this.state.messageHistory.length -9)
    }
    this.setState({
      messageHistory: temp
    })
  }


  publish (e) { //send message and update convos
    e.preventDefault()
    //send message
    this.pubnub.publish({
      channel: this.state.channelName,
      message: {
        username: this.props.params.username,
        text: this.refs.message.value
      } //this.props.user.username + ": " + this.refs.message.value
    }, (status, response) => {
      this.refs.message.value = ""
    })
    //add to convo history
    //fix all the params here
    if (this.state.usersHistory_names.indexOf(this.props.params.user) === -1) { //check if not already in history
      this.pubnub.publish({ //publish to your conversation history
        channel: this.state.historyChannel,
        message: this.props.params.otheruser
      })
      this.pubnub.publish({ //publish to other user's conversation history
        channel: this.props.params.otheruser + 'history',
        message: this.props.params.username
      })
      //TODO- MAKE A DISPATCH
      this.setState({usersHistory_names: this.state.usersHistory_names.concat(this.props.params.otheruser)})
    }
  }
  // <img src={post.user.gravatar} className="post-image" style={imgStyle} />

  refresh (channel) { //fetch messages and convos on load
    channel = channel || this.state.channelName
    this.pubnub.history( //fetch past messages
      {
        channel: channel,
        reverse: false,
        count: 10,
      },
      (status, response) => {
        if(response === undefined) {
          return;
        } else {
          //TODO- MAKE A DISPATCH
          this.setState({messageHistory: response.messages.map((message) => { //map messages
              return ( //EXTERNALIZE TO AN ENTRY
                <div key={Math.random()}>
                  {message.entry.text}
                </div>
              )
            })
          })
        }
    })
    this.pubnub.history({ //fetch past convos
      channel: this.state.historyChannel,
      reverse: false,
      count: 5
    }, (status, response) => {
      if (response === undefined) {
        return;
      } else {
        //TODO- MAKE A DISPATCH
        this.setState({usersHistory: response.messages.map((message) => { //map past convos
            if(message.entry !== " ") {
              return (
                <div key={Math.random()} onClick={this.navToMessage.bind(this, message.entry)}>
                  {message.entry}
                </div>
              )
            }
          }).reverse()
        })
        //TODO- MAKE A DISPATCH
        this.setState({usersHistory_names: response.messages.map((message) => { //set past convos in state
            return message.entry
          })
        })//.reverse()
      }
    })
  }

  navToMessage (newUser) {
    //change directory
    browserHistory.push('/message/' + this.props.params.username + '/' + newUser)
    //disconnect from current channel
    this.pubnub.unsubscribeAll()
    //use variable because state doesn't update
    const newChannel = [newUser, this.props.params.username].sort().join("")
    //reset channel
    this.setState({
      channelName: newChannel
    })
    //resubscribe to appropriate channel and refresh() with new state values
    this.pubnub.subscribe({
      channels: [newChannel]
    })
    this.refresh(newChannel)
  }

  showConversation () { //check if a convo is selected
    const messageStyle = {
      height: 325,
      overflow: 'scroll'
    }
    const inputBarStyle = {
      width: '90%'
    }
    if(this.props.user.username === this.props.params.otheruser || !this.props.params.otheruser) {
      return (
        <div className="col-lg-9 feed">
          <h1>Select a conversation</h1>
        </div>
      )
    } else {
      return (
        <div className="col-lg-9 feed">
          <div className="header">
            <h1>Messaging {this.props.params.user}</h1>
          </div>
          <div style={messageStyle}>
            {this.state.messageHistory}
          </div>
          <form onSubmit={this.publish.bind(this)}>
            <input type="text" ref="message" style={inputBarStyle}></input>
            <button>send</button>
          </form>
        </div>
      )
    }
  }

  render () {
    const convoStyle = {
      height: 400,
      overflow: 'scroll'
    }
    return (
      <div className="row">
        {this.showConversation()}
        <div className="col-lg-3">
          <h2>Recent</h2>
          <div style={convoStyle}>
            {this.state.usersHistory}
          </div>
        </div>
      </div>
    )
  }
}

export default Message;
