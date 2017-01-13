import React from 'react'
import PubNub from 'pubnub'
import UserPic from './userPicture.js'

class Message extends React.Component {

  constructor(props) {
    super()
    this.state = {
      messageHistory: [<div key='loading'> LOADING </div>],
      channelName: null
    }
  }

  componentWillMount () {
    this.setState({channelName: [this.props.params.user, this.props.user.username].sort().join("")})
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
      this.refs.message.value = ""
    })
  }

  refresh () {
    this.pubnub.history(
      {
        channel: this.state.channelName,
        reverse: false, //oldest first if true [0]
        count: 10,
      },
      (status, response) => {
        if(response === undefined) {
          console.log("empty res")
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
  }

  render () {
    return (
      <div>
        <h1>messaging</h1>
        <UserPic username={this.props.params.user} />
        <UserPic username={this.props.user.username} />
        <div>
          {this.state.messageHistory}
        </div>
        <form onSubmit={this.publish.bind(this)}>
          <input type="text" ref="message"></input>
          <button >send</button>
        </form>
      </div>
    )
  }
}

export default Message