import React from 'react'
import EntryComponentSeed from './InterestEntryComponent-Seeded.jsx'
import EntryComponent from './InterestEntryComponent.jsx'
import {connect} from 'react-redux';
import Seed from '../../seed.js'

class InterestComponent extends React.Component {
  render () {
    let context = 'edit'
    if (!this.props.user.username || this.props.user.username !== this.props.username) {
      context = 'view'
    }
    
    let seeded = Seed.interests
    .filter((interest) => {
      return interest.username === this.props.username
    })
    .map((entry) => {
      return (
        <EntryComponent key={entry.post_id} id={entry.post_id} context={context} type="seed" />
      );
    })

    let posted = this.props.posts
    .filter((entry) => {
      return entry.username === this.props.username
    })
    .map((entry) => {
      return (
        <EntryComponent key={entry.post_id} id={entry.post_id} context={context} />
      )
    }).reverse()

    return (
      <div>
        {posted}
        {seeded}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    posts: state.userPosts
  };
}

export default connect(mapStateToProps)(InterestComponent)