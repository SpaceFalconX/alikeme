import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Seed from '../../seed.js'
import {addTag, removeTag, clearTags} from '../../actions/tagActions.js'
import {submitNewPost} from '../../actions/post_actions.js'

class NewInterest extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const content = this.refs.content.value;
    const title = this.refs.title.value
    const category = [this.refs.category.value].concat(this.props.tags)
    const user_id = this.props.user.id;
		const username = this.props.user.username;
    let userData = {title, content, category, user_id, username}
    this.props.submitNewPost(userData);
    this.props.clearTags();
    this.refs.interests.reset();
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
          <button>CREATE</button>
        </form>
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
    submitNewPost
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewInterest);