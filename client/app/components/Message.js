import React from 'react'
import PubNub from 'pubnub'
import {clearTags} from '../actions/tag_actions.js'
import {browserHistory} from 'react-router'
import UserPic from './UserAvatar.js'

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
  //Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the Message component.
  componentWillMount () {
    this.props.dispatch(clearTags()) //lazy routing fix until redux integration
    this.setState({channelName: [this.props.params.user, this.props.params.username].sort().join("")})
    this.setState({historyChannel: this.props.params.username + 'history'})
  }

  handleNewMessage (message) { //for listener
    //concat new messages to state
    let temp = this.state.messageHistory
    .concat([ //EXTERNALIZE TO AN ENTRY
      <div key={Math.random()}>
        <UserPic username={message.username} />
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

  componentDidMount () { //init pubnub
    console.log('on mount', this.props)
    this.pubnub = new PubNub({
        publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
        subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
    })
    this.pubnub.addListener({
      message: (m) => {
        this.handleNewMessage(m.message)
      }
    })
    this.pubnub.subscribe({
      channels: [this.state.channelName]
    })
    this.refresh()
  }

  componentWillReceiveProps (nextProps) {
    console.log("next", nextProps)
  }

  componentWillUnmount () {
    this.pubnub.unsubscribeAll()
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
        message: this.props.params.user
      })
      this.pubnub.publish({ //publish to other user's conversation history
        channel: this.props.params.user + 'history',
        message: this.props.params.username
      })
      //TODO- MAKE A DISPATCH
      this.setState({usersHistory_names: this.state.usersHistory_names.concat(this.props.params.user)})
    }
  }

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
          console.log("empty conversation res")
          return
        } else {
          //TODO- MAKE A DISPATCH
          this.setState({messageHistory: response.messages.map((message) => { //map messages
              return ( //EXTERNALIZE TO AN ENTRY
                <div key={Math.random()}>
                  <UserPic username={message.entry.username} />
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
        console.log('empty message history res')
        return
      } else {
        //TODO- MAKE A DISPATCH
        this.setState({usersHistory: response.messages.map((message) => { //map past convos
            if(message.entry !== " ") {
              return (
                <div key={Math.random()} onClick={this.navToMessage.bind(this, message.entry)}>
                  <UserPic username={message.entry} />
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
    if(this.props.user.username === this.props.params.user || !this.props.params.user) {
      return (
        <div className="col-md-6 space">
          <h1>Select a conversation</h1>
        </div>
      )
    } else {
      return (
        <div className="col-md-6 space">
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
      <div>
        <div className="col-md-4 space">
          <h2>Recent</h2>
          <div style={convoStyle}>
            {this.state.usersHistory}
          </div>
        </div>
        {this.showConversation()}
      </div>
    )
  }
}

export default Message
