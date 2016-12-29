import React from 'react';
import Seed from '../../seed.js'

class NewInterest extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const description = this.refs.description.value;
    const category = this.refs.category.value;
    const title = this.refs.title.value
    let userData = {title, description, category}
    console.log(userData)
    this.refs.interests.reset();
  }

  handleMini(e){
    e.preventDefault();
    console.log(this.refs.tags.value)
    this.refs.tags.value = "";
  }

  render () {
    let options = [];

    Seed.choices.forEach(function(choice){
      options.push(<option key={choice}>{choice}</option>)
    })

    return (
      <div>
        <form ref="interests" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="title" placeholder="title"></input>
          <br />
          <textarea ref="description" rows="5" cols="30">
          </textarea>
          <br />
          <input ref="tags" type="text" placeholder="add a tag"></input>
          <button onClick={this.handleMini.bind(this)}>add tag</button>
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

export default NewInterest