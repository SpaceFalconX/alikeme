import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import {Link} from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import {fetchCategories} from '../actions/category_actions.js'
import {fetchPostsFromDb, filterPosts, filterTagsfromDb, clearPosts, updateStarredPosts} from '../actions/post_actions.js'
import NewPostForm from './NewPost.js'

class Browse extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchPostsFromDb())
    .then(()=> {
      const {user, allPosts, starredPosts} = this.props
      this.props.dispatch(updateStarredPosts(user.id, allPosts, starredPosts));
    })
  }

  render () {
    const {personalityMatches, user, params, dispatch, allPosts} = this.props;
    const {category} = params;
    const filtered = category === undefined ?
    allPosts.filter(post => post.user.username !== user.username):
    allPosts.filter(post => post.category.name === category &&
      post.user.username !== user.username);
    const CARDS = {
      float:'left',
      paddingLeft:'10px',
    }

    return (
      <div className="row">
        <div className="col-lg-9 feed">
          <NewPostForm {...this.props} />
            { filtered.map((post) => {
                return (
                  <Post key={post.id} personalityMatches={personalityMatches} user={user} params={params}
                  dispatch={dispatch} post={post} />
                )
              })
            }
        </div>
        <div className="col-lg-3">
          <h4 className="small-title">Filter posts by category</h4><hr/>
            {
              this.props.categories.map((category, index) =>
                (
                  <div key={category.id} className="row">
                  <label className="form-check-label" style={CARDS}>
                    <Link className="linkto category" activeStyle={{
                      backgroundColor: '#9C27B0',
                      textDecoration: 'none',
                      color: 'white'
                    }} to={'/browse/' + this.props.user.username + '/' + category.name}>
                      {category.name}
                    </Link>
                  </label>
                </div>
                )
              )
            }
        </div>

      </div>

    )
  }
}

export default Browse;
