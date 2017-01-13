import React from 'react'
import PubNub from 'pubnub'
// import _ from 'underscore'
import {browserHistory, refresh} from 'react-router'
import UserPic from './userPicture.js'

class Message extends React.Component {

  constructor(props) {
    super()
    this.state = {
      messageHistory: [<div key='loading'> LOADING </div>],
      usersHistory: [<div key='loadingHistory'> LOADING </div>],
      usersHistory_names: null,
      channelName: null,
      historyChannel: null
    }
  }

  componentWillMount () {
    this.setState({channelName: [this.props.params.user, this.props.user.username].sort().join("")})
    this.setState({historyChannel: this.props.user.username + 'history'})
  }

  handleNewMessage (message) {
    let temp = this.state.messageHistory.concat([<div key={Math.random()}>{message}</div>]).slice(this.state.messageHistory.length -9)
    this.setState({
      messageHistory: temp
    })
  }

  componentDidMount () {
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

  componentWillUnmount () {
    this.pubnub.unsubscribeAll()
  }

  publish (e) {
    e.preventDefault()
    this.pubnub.publish({
      channel: this.state.channelName,
      message: this.props.user.username + ": " + this.refs.message.value
    }, (status, response) => {
      console.log('message publish', status, response)
      this.refs.message.value = ""
    })
    if (this.state.usersHistory_names.indexOf(this.props.params.user) === -1) {
      this.pubnub.publish({ //publish to both users' 'all messages' history
        channel: this.state.historyChannel,
        message: this.props.params.user
      })
      this.pubnub.publish({
        channel: this.props.params.user + 'history',
        message: this.props.user.username
      })
      this.setState({usersHistory_names: this.state.usersHistory_names.concat(this.props.params.user)})
    }
  }

  refresh () {
    this.pubnub.history(
      {
        channel: this.state.channelName,
        reverse: false,
        count: 10,
      },
      (status, response) => {
        if(response === undefined) {
          console.log("empty conversation res")
          return
        } else {
          this.setState({messageHistory: response.messages.map((message) => {
              return (
                <div key={Math.random()}>{message.entry}</div>
              )
            })
          })
        }
    })
    this.pubnub.history({
      channel: this.state.historyChannel,
      reverse: false,
      count: 10
    }, (status, response) => {
      if (response === undefined) {
        console.log('empty message history res')
        return
      } else {
        this.setState({usersHistory: response.messages.map((message) => {
            return (
              <div key={Math.random()} onClick={this.navToMessage.bind(this, message.entry)}>
                {message.entry}
              </div>
            )
          })
        })
        this.setState({usersHistory_names: response.messages.map((message) => {
          return message.entry
        })})
      }
    })
  }

  navToMessage (user) {
    browserHistory.push('/message/' + user)
    location.reload();
    //RE RENDER THIS PAGE IDIOT.
  }

  render () {
    return (
      <div>
        <h1>Messaging</h1>
        <UserPic username={this.props.params.user} />
        <UserPic username={this.props.user.username} />
        <div>
          {this.state.messageHistory}
        </div>
        <form onSubmit={this.publish.bind(this)}>
          <input type="text" ref="message"></input>
          <button>send</button>
        </form>
        <h2>All Messages</h2>
        <div>
          {this.state.usersHistory}
        </div>
      </div>
    )
  }
}

export default Message