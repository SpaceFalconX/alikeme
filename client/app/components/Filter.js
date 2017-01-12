import React from 'react'
import {Link} from 'react-router'
import {logoutClick} from '../actions/auth_actions.js'

const Filter = React.createClass({

  render() {
    return (
      this.props.categories.map((category, index) => {
        return (
          <div key={index} className="form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox"
            ref={category.name} onChange={this.filterCategory}
            checked={category.name !== undefined? categ === category.name : false } />
            <Link to={'/browse/' + this.props.user.username + '/' + category.name}>{category.name}</Link>
            {categ}
          </label>
        </div>
        )
      })
    )
  }
})

export default Filter;



