import React  from 'react'

class Edit extends React.Component {
  render () {
    return (
      <div>
        Editing {this.props.params.postid}
      </div>
    )
  }
}

export default Edit