import React from 'react'
import axios from 'axios'

class UserPic extends React.Component {
  constructor(props) {
    super()
    state: {
      profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"
    }
  }

  componentWillMount () {
    this.setState({profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"})
  }

  render () {
    console.log("STATE")
    const imgStyle = () => {
      if(!this.props.style) {
        return {
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          border: '2px, solid, #000'
        }
      } else {
        return this.props.style
      }
    }

    const cName = () => {
      if(!this.props.className) {
        return "media-photo"
      } else {
        return this.props.className
      }
    }


    return (
      <img src={this.state.profilePicture} className={cName()} style={imgStyle()} />
    )
  }
}

export default UserPic