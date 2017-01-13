import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {fetchCategories} from '../actions/category_actions.js'
import { fetchPostsFromDb, filterPosts, filterTagsfromDb, clearPosts} from '../actions/post_actions.js'


class Browse extends React.Component {

    constructor (props) {
      super()
      this.state = {
        filter: [],
        filtering: false
      }
    }

  componentWillMount() {
    this.props.dispatch(fetchPostsFromDb());
    if(this.props.categories.length === 0) {
      this.props.dispatch(fetchCategories());
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
      this.props.dispatch(filterTagsfromDb(this.refs.search.value))
    }

    if(search && this.state.filter.indexOf(this.refs.search.value) === -1){
      this.props.dispatch(filterPostsFromDb(search.id))
    }

    this.setState({filter: this.state.filter.concat(this.refs.search.value)})
    this.refs.search.value = "";
  }

  clearFilter () {
    this.setState({filter: [], filtering: false})
    this.props.dispatch(fetchPostsFromDb())
  }

  render () {
    const {category} = this.props.params
    const filtered = category === undefined ? this.props.allPosts :
    this.props.allPosts.filter(post => post.category.name === category);
    return (
      <div className="col-md-6" >
        <h1>browse</h1>
            <div>
              {
                this.props.categories.map((category, index) => {
                  return (
                    <div key={index} className="form-check">
                    <label className="form-check-label">
                      <Link activeStyle={{
                        color: 'black',
                        background: 'pink'
                      }} to={'/browse/' + this.props.user.username + '/' + category.name}>
                      {category.name}</Link>
                    </label>
                  </div>
                  )
                })
              }
            </div>
            <div className="row">
              { filtered.map((post) => {
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

// <Link to={'/browse/' + this.props.user.username + '/' + category.name}>
//                       {category.name} </Link>

  // filterTags () {
  //   if(!this.state.filter.length) {
  //     return
  //   }
  //   return this.state.filter.map((tag) => {
  //     return (
  //       <div key={tag}>{tag}</div>
  //     )
  //   }).concat(<div key="clear" onClick={this.clearFilter.bind(this)}>CLEAR</div>)
  // }
