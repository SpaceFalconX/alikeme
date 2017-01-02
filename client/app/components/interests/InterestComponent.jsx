import React from 'react'
import EntryComponent from './InterestEntryComponent.jsx'
import {connect} from 'react-redux';
import Seed from '../../seed.js'

class InterestComponent extends React.Component {

  render () {
    console.log(this.props.posts)

    let seeded = Seed.interests.filter((interest) => {
      return interest.user === this.props.username
    }).map((entry) => {
      return (
        <EntryComponent key={entry.id} id={entry.id} context="edit" title={entry.title} description={entry.description} category={entry.category} />
      );
    })

    let posted = this.props.posts.map((entry) => {
      console.log(entry)
      return (
        <EntryComponent key={entry.user_id} id={entry.user_id} context="edit" title={entry.title} description={entry.content} category={entry.category} />
      )
    })

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
    tags: state.tags.tags,
    user: state.user,
    posts: state.userPosts
  };
}

export default connect(mapStateToProps)(InterestComponent)