import React from 'react'

class newEntryComponent extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const description = this.refs.description.value;
    const category = this.refs.category.value;
    let userData = {description, category}
    //console.log(userData)
    this.refs.entries.reset();
  }

  render () {
    return (
      <div>
        <form ref="entries" onSubmit={this.handleSubmit.bind(this)}>
          <textarea ref="description" rows="5" cols="30">
          </textarea>
          <br />
          category:
          <select ref="category">
            <option>public (everyone)</option>
            <option>private (only me)</option>
          </select>
          <button>CREATE</button>
        </form>
      </div>
    )
  }
}

export default newEntryComponent;