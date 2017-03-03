import React from 'react';
import {bindActionCreators} from 'redux';
import {addTag, removeTag, clearTags} from '../actions/tag_actions.js'
import {submitNewPost} from '../actions/post_actions.js'
import {browserHistory, Link} from 'react-router'


const NewPostForm = React.createClass({
  componentWillMount () {
    this.state = {
      formClass: 'postForm-NoAnimate'
    }
  },

  postStyle () {
    return {
      margin: '0px 10px 0px 0px',
      fontSize: 13,
      fontWeight: 600
    }
  },

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
        <div className="label label-info"
          key={tag} onClick={this.dispatchRemoveTag.bind(this, {tag})}>
          {tag}
        </div>
      )
    })
  },

  render() {
    const TAG_CSS = {
      paddingBottom: '5px'
    }

    const toggleForm = () => {
      //console.log("changing from", this.state)
      if(this.state.formClass === 'postForm' || this.state.formClass === "postForm-NoAnimate") {
        this.setState({formClass: 'postFormHidden'})
      } else {
        this.setState({formClass: 'postForm'})
      }
    }

    return (
        <div className="block">
          <div onClick={toggleForm}>
            <h4 className="small-title"> Create a new Post</h4><hr/>
          </div>
          <div className={this.state.formClass}>
            <form ref="newPostForm" onSubmit={this.handleSubmit}>
              <div className ="form-group">
                <input className="form-control" type="text" ref="title" placeholder="Title..."/>
              </div>
              <div className="form-group">
                <textarea className="form-control" type="text" ref="content" placeholder="What sparks your interest?"/>
              </div>
                <div className="form-inline post-select-container">
                  <div style={TAG_CSS}>
                    <label style={this.postStyle()}>Tags</label>
                    {this.domTags()}
                    <input className="form-control" id="inlineFormInputGroup" type="text" ref="tag" placeholder="Add a new tag"/>
                    <button className="btn btn-sm linkto addtag-btn"  onClick={this.addNewTag}>Add tag</button>
                  </div>
                  <div>
                    <label style={this.postStyle()}>Select a Category</label>
                    <select className="form-control" id="inlineFormInputGroup" ref="category">
                      {this.props.categories.map((category, index) => {
                        return <option key={category.id}>{category.name}</option>
                      })}
                    </select>
                  </div>
                    <input type="submit" className="btn btn-default linkto post-btn pull-right" value="Submit Post" />
                </div>
            </form>
          </div>
        </div>
    )
  }
})

export default NewPostForm;
