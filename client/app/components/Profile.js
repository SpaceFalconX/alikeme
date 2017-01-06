import React from 'react';
import {connect} from 'react-redux';
import NewInterest from './interests/newInterestComponent.jsx'
import NewEntry from './entries/newEntryComponent.jsx'
import Interests from './interests/InterestComponent.jsx'
import {fetchCategories} from '../actions/category_actions.js'

//todo
//make code reuseable for logged in and non-logged in users

class ProfileComponent extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
    this.setState({toggle: "Entry"})
  }

  toggle () {
    this.state.toggle === 'Interest' ?
    this.setState({toggle: 'Entry'}) :
    this.setState({toggle: 'Interest'})
  }
  // editOrView () {
  //     return (
  //       <div>
  //         <h1>Your Profile</h1>
  //         {this.profilePicture()}
  //         <h2>create a new {this.state.toggle}</h2>
  //         {this.createNewPost()}
  //         <h2>my posts</h2>
  //         <Interests username={this.props.params.username} />
  //       </div>
  //     )
  //   }
  // },
  render () {
    return (
      <div>
        <NewInterest {...this.props} />
      </div>
    )
  }
}

export default ProfileComponent;