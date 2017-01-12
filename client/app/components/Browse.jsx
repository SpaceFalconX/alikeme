import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {fetchCategories} from '../actions/category_actions.js'
import { fetchPostsFromDb, filterPostsFromDb, filterTagsfromDb, clearPosts} from '../actions/post_actions.js'


class Browse extends React.Component {
  constructor (props) {
    super()
    this.state = {
      filter: [],
      filtering: false
    }
  }

  filter (e) {
    e.preventDefault()
    if(!this.state.filtering){
      this.props.dispatch(clearPosts()) //clear initial all results to prevent dupes
      this.setState({filtering: true})
    }

    let search = this.props.categories.filter((category) => {
      return this.refs.search.value === category.name
    })[0]

    if(!search && this.state.filter.indexOf(this.refs.search.value) === -1) {
      console.log('no category results, searching by tag')
      this.props.dispatch(filterTagsfromDb(this.refs.search.value))
    }

    if(search && this.state.filter.indexOf(this.refs.search.value) === -1){
      console.log('searching by category')
      this.props.dispatch(filterPostsFromDb(search.id))
    }

    this.setState({filter: this.state.filter.concat(this.refs.search.value)})
    this.refs.search.value = "";
  }


  componentWillMount() {
    console.log("props categories", this.props.categories)
    this.props.dispatch(fetchPostsFromDb())
      if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
    }
  }

  clearFilter () {
    this.setState({filter: [], filtering: false})
    this.props.dispatch(fetchPostsFromDb())
  }

  filterTags () {
    if(!this.state.filter.length) {
      return
    }
    return this.state.filter.map((tag) => {
      return (
        <div key={tag}>{tag}</div>
      )
    }).concat(<div key="clear" onClick={this.clearFilter.bind(this)}>CLEAR</div>)
  }

  render () {
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

            {this.filterTags()}

            <div>
              {
                this.props.categories.map((category, index) => {
                  return (<div key={index} className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" value="" />
                      <Link to={this.props.router.location.pathname + '/'+ category.name}>{category.name}</Link>
                    </label>
                  </div>
                  )
                })
              }
            </div>
            <div className="row">
              { this.props.allPosts.map((post) => {
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