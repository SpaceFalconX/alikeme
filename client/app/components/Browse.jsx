import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import {fetchCategories} from '../actions/category_actions.js'
import { fetchPostsFromDb, filterPostsFromDb} from '../actions/post_actions.js'


class Browse extends React.Component {
  constructor(props) {
    super()
    // this.state = {
    //   searchTerm : ''
    // }
  }

  filter (e) {
    e.preventDefault()
    let search = this.props.categories.filter((category) => {
      return this.refs.search.value === category.name
    })[0]
    console.log(search.id)
    this.props.dispatch(filterPostsFromDb(search.id))
    this.refs.search.value = "";
  }

  componentWillMount() {
    // if(this.props.allPosts.length === 0){
    //   this.props.dispatch(fetchPostsFromDb())
    // }
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  render () {
    console.log(this.props)
    let sorted = this.props.allPosts.sort((a,b) => {
      return a.id < b.id
    })
    return (
      <div className="col-md-6" >
        <h1>browse</h1>
            <div className="input-group">
              <span>search</span>
              <form onSubmit={this.filter.bind(this)}>
              <input ref='search' placeholder='filter by category' type="text" />
              <button>search</button>
              </form>
            </div>
            <div className="list-group">
              { sorted.map((post) => {
                  return (
                    <Post key={post.id} post={post} contextUser={this.props.user.username} />
                  )
                })
              }
            </div>
      </div>
    )
  }
}

export default Browse;