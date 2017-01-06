import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Seed from '../../seed.js'
import {browserHistory} from 'react-router'
import {addTag, removeTag, clearTags} from '../../actions/tag_actions.js'
import {updatePostToDb, deletePostFromDb} from '../../actions/post_actions.js'

class NewInterest extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const content = this.refs.content.value;
    const title = this.refs.title.value
    const category = [this.refs.category.value].concat(this.props.tags)
    const user_id = this.props.user.id;
		const username = this.props.user.username;
    const post_id = this.props.id
    let userData = {title, content, category, user_id, username, post_id}
    this.props.updatePostToDb(userData);
    this.props.clearTags();
    this.refs.interests.reset();
  }

  deletePost() {
    console.log("delete")
    const post_id = this.props.id
    let userData = {post_id}
    this.props.deletePostFromDb(userData)
    browserHistory.push('/profile/' + this.props.user.username)
  }

  handleTag(toggle, str, e) {
    e.preventDefault();
    if(toggle === "add"){
      this.props.addTag(this.refs.tags.value);
    }
    if(toggle === "remove"){
      this.props.removeTag(str.tag);
    }
    this.refs.tags.value = "";
  }

  render () {
    let options = Seed.choices.map((choice) => {
      return <option key={choice}>{choice}</option>
    })
    let domTags = this.props.tags.map((tag) => {
      return <p key={tag} onClick={this.handleTag.bind(this, "remove", {tag})}> {tag} </p>
    })

    return (
      <div>
        <form ref="interests" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="title" placeholder="title"></input>
          <br />
          <textarea ref="content" rows="5" cols="30">
          </textarea>
          <br />
          <input ref="tags" type="text" placeholder="add a tag"></input>
          <button onClick={this.handleTag.bind(this, "add", null)}>add tag</button>
          <div>
            {domTags}
          </div>
          <br />
          category:
          <select ref="category">
            {options}
          </select>
          <button>UPDATE</button>
        </form>
          <button onClick={this.deletePost.bind(this)}>DELETE</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags.tags,
    user: state.user
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addTag,
    removeTag,
    clearTags,
    updatePostToDb,
    deletePostFromDb
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewInterest);