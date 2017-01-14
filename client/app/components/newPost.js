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
    console.log("POSTDATA", postData)
    this.props.dispatch(submitNewPost(postData)).then(()=> {
      // this.props.dispatch(clearTags())
      this.refs.newPostForm.reset();
    })
    },

  domTags () {
    return this.props.tags.map((tag) => {
      return (
        <div className="label label-info"  key={tag} onClick={this.dispatchRemoveTag.bind(this, {tag})}> {tag} </div>
      )
    })
  },

  render() {
    const FORM_CSS = {
      paddingLeft: '20px'
    }
    const TAG_CSS = {
      paddingBottom: '5px'
    }
    return (
        <div className="block">
          <h3> Hello {this.props.user.username}!</h3>
          <h5> Create a new Post!</h5><hr/>
          <form ref="newPostForm" onSubmit={this.handleSubmit}>
          <div className ="form-group">
            <input className="form-control" type="text" ref="title" placeholder="PostTitle"/>
          </div>
          <div className="form-group">
            <textarea className="form-control" type="text" ref="content" placeholder="Content"/>
          </div>
              <div className="form-group">
              <div style={TAG_CSS}>
              {this.domTags()}
              </div>
                <input className="form-inline" type="text" ref="tag" placeholder="Add a new tag"/>
                <button className="btn btn-sm" onClick={this.addNewTag}>Add tag</button>
                <label style={FORM_CSS}>Select a Category</label>
                <select ref="category">
                  {this.props.categories.map((category, index) => {
                    return <option key={category.id}>{category.name}</option>
                  })}
                </select>
              </div>
          <input type="submit" className="btn btn-default" value="Submit Post" />
          </form>
        </div>
    )
  }
})

export default NewPostForm;

// class NewPost extends React.Component {

//   handleSubmit(e) {
//     e.preventDefault();
//     const content = this.refs.content.value;
//     const title = this.refs.title.value
//     const category = [this.refs.category.value].concat(this.props.tags)
//     const user_id = this.props.user.id;
// 		const username = this.props.user.username;
//     let userData = {title, content, category, user_id, username}
//     this.props.submitNewPost(userData);
//     this.props.clearTags();
//     this.refs.interests.reset();
//   }

//   handleTag(toggle, str, e) {
//     e.preventDefault();
//     if(toggle === "add"){
//       this.props.addTag(this.refs.tags.value);
//     }
//     if(toggle === "remove"){
//       this.props.removeTag(str.tag);
//     }
//     this.refs.tags.value = "";
//   }

//   render () {
//     let options = Seed.choices.map((choice) => {
//       return <option key={choice}>{choice}</option>
//     })
//     let domTags = this.props.tags.map((tag) => {
//       return <p key={tag} onClick={this.handleTag.bind(this, "remove", {tag})}> {tag} </p>
//     })

//     return (
//       <div className="form-group">
//         <form ref="interestsForm" onSubmit={this.handleSubmit.bind(this)}>
//           <label>Title</label>
//           <input type="text" ref="title" placeholder="title"/><br />
//           <textarea ref="content" rows="5" cols="30"/><br />
//           <input ref="tags" type="text" placeholder="add a tag"/>
//           <button onClick={this.handleTag.bind(this, "add", null)}>add tag</button>
//           <div>
//             {domTags}
//           </div>
//           <br />
//           category:
//           <select ref="category">
//             {options}
//           </select>
//           <button>CREATE</button>
//         </form>
//       </div>
//     )
//   }
// }


