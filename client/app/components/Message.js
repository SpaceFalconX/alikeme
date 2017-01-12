import React from 'react'
import PubNub from 'pubnub'

class Message extends React.Component {

  constructor(props) {
    super()
    this.state = {
      messageHistory: []
    }
  }
  
  componentDidMount () {
    this.pubnub = new PubNub({
        publishKey: 'pub-c-f5e1b611-9e28-4b7a-85bc-53d8ffb17f95',
        subscribeKey: 'sub-c-45dd39e4-d8ee-11e6-a0b3-0619f8945a4f',
    });
    this.pubnub.subscribe({
      channel: 'demo'
    });
    this.refresh()
  }

  componentWillUnmount () {
    this.refresh = () => {
      return
    }
  }

  publish (e) {
    e.preventDefault()
    this.pubnub.publish({
      channel: 'demo',
      message: this.props.user.username + ": " + this.refs.message.value
    }, () => {
      this.refs.message.value = ""
    })
  }

  refresh () {
    this.pubnub.history(
      {
        channel: 'demo',
        reverse: false, //oldest first if true [0]
        count: 10,
      },
      (status, response) => {
        if(response === undefined) {
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
    setTimeout(() => {
      this.refresh()
    }, 1000)
  }

  render () {
    return (
      <div>
        <h1>messaging</h1>
        <form onSubmit={this.publish.bind(this)}>
          <input type="text" ref="message"></input>
          <button >test</button>
        </form>
        {this.state.messageHistory}
      </div>
    )
  }
}

export default Message