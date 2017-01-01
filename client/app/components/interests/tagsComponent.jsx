import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addTag, removeTag} from '../../actions/tagActions.js'

class Tags extends React.Component {

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
    let domTags = this.props.tags.map((tag) => {
      return <p key={tag} onClick={this.handleTag.bind(this, "remove", {tag})}> {tag} </p>
    })

    return (
      <div>
          <input ref="tags" type="text" placeholder="add a tag"></input>
          <button onClick={this.handleTag.bind(this, "add", null)}>add tag</button>
          <div>
            {domTags}
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags.tags
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addTag,
    removeTag
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Tags);