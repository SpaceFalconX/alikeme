import React from 'react';
import {bindActionCreators} from 'redux';
import {addTag, removeTag, clearTags} from '../actions/tag_actions.js'
import {submitNewPost} from '../actions/post_actions.js'
import {browserHistory, Link} from 'react-router'


const NewPostForm = React.createClass({

  addNewTag(e) {
    e.preventDefault();
    this.props.dispatch(addTag(this.refs.tag.value))
    this.refs.tag.value = ""
  },

  dispatchRemoveTag (tag) {
    this.props.dispatch(removeTag(tag.tag))
  },

  handleSubmit(e) {
    e.preventDefault();
    const content = this.refs.content.value;
    const title = this.refs.title.value;
    const category = this.refs.category.value;
    const category_id = this.props.categories.find((category)=> {
      return this.refs.category.value === category.name
    }).id
    const username = this.props.user.username;
    const user_id = this.props.user.id;
    const tags = this.props.tags;
    const postData = {user_id, username, category, content, title, category_id, tags}
    this.props.dispatch(submitNewPost(postData))
    //TODO:
    .then(()=> this.refs.newPostForm.reset());
    this.props.dispatch(clearTags())
  },

  domTags () {
    return this.props.tags.map((tag) => {
      return (
        <div className="label label-info"  key={tag} onClick={this.dispatchRemoveTag.bind(this, {tag})}> {tag} </div>
      )
    })
  },

  render() {
    return (
        <div className="block">
          <h3> Hello {this.props.user.username}!</h3>
          <h4> Create a new Post!</h4><hr/>
          <form ref="newPostForm" onSubmit={this.handleSubmit}>
          <div className ="form-group">
            <label>PostTitle</label>
            <input className="form-control" type="text" ref="title" placeholder="Title"/>
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea className="form-control" type="text" ref="content" placeholder="new post"/>
          </div>
          <div className ="form-group">
            <label>Select a Category</label>
            <select ref="category">
              {this.props.categories.map((category, index) => {
                return <option key={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div>
          {this.domTags()}
          </div>
          <div className ="form-group">
            <label>tags</label>
            <input className="form-inline" type="text" ref="tag" placeholder="new post"/>
            <button className="btn btn-sm" onClick={this.addNewTag}>Add tag</button>
          </div>
          <input type="submit" className="btn btn-default" value="Submit Post" />
          </form>
        </div>
    )
  }
})

export default NewPostForm;



