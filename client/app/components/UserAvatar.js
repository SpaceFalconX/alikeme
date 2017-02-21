// import React from 'react'
// import axios from 'axios'

// class UserPic extends React.Component {
//   constructor(props) {
//     super()
//     state: {
//       profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"
//     }
//   }

//   componentWillMount () {
//     this.setState({profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"})
//   }

//   render () {
//     const imgStyle = {
//       height: '40px',
//       width: '40px',
//       borderRadius: '50%',
//       border: '2px, solid, #000'
//     }
//     return (
//       <img src={this.state.profilePicture} className="media-photo" style={imgStyle} />
//     )
//   }
// }

// export default UserPic

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
          height: '60px',
          width: '60px',
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

    const handleError = () => {
      this.setState({profilePicture: "http://www.topcareer.jp/inter_blog/wp-content/uploads/100_100_empty.gif"})
    }

    return (
      <img src={this.state.profilePicture} className={cName()} style={imgStyle()} onError={handleError}/>
    )
  }
}

export default UserPic
