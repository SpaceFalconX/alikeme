import React from 'react'

class UserPic extends React.Component {
  constructor(props) {
    super()
    state: {
      profilePicture: null
    }
  }

  componentWillMount () {
    this.setState({profilePicture: 'http://res.cloudinary.com/isaacxpreston/image/upload/' + this.props.username + '.jpg'})
  }

  render () {
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

    const handleError = () => {
      this.setState({profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"})
    }

    return (
      <img src={this.state.profilePicture} className="media-photo" className={this.props.className} style={imgStyle()} onError={handleError}/>
    )
  }
}

export default UserPic