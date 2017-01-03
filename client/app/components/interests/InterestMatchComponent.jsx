import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import EditComponent from './editInterestComponent.jsx'
import BackButton from '../backButton.jsx'
import {connect} from 'react-redux';
import Seed from '../../seed.js'

class InterestMatch extends React.Component {
  render () {
    let current;

    current = this.props.posts.filter((entry) => {
      return parseInt(entry.post_id) === parseInt(this.props.params.id)
    })[0]

    console.log("SHOULD BE HERE", current)

    if(!current){ //check seed js
      current = Seed.interests.filter((entry) => {
        return parseInt(entry.post_id) === parseInt(this.props.params.id)
      })[0]
    }

    let seedMatches = Seed.interests.filter((entry) => {
      return entry.category[0] === current.category[0] && entry.username !== current.username
    }).map((entry) => {
      return (
        <EntryComponent key={entry.post_id} id={entry.post_id} context="view" />
      )
    })

    return (
      <div>
        <h1>viewing your post</h1>
        <EntryComponent id={this.props.params.id}/>
        <h1>your matches</h1>
        {seedMatches}
        <h2>edit/delete</h2>
        <EditComponent id={this.props.params.id} />
        <br />
        <BackButton />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.userPosts
  };
}

export default connect(mapStateToProps)(InterestMatch)