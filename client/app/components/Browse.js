import React from 'react';
import Post from './Post.js'
import {connect} from 'react-redux';
import {Link} from 'react-router'
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
    const {personalityMatches, user, params, dispatch} = this.props;
    const {category} = params;
    const filtered = category === undefined ? this.props.allPosts :
    this.props.allPosts.filter(post => post.category.name === category);
    const CARDS = {
      float:'left',
      paddingLeft:'10px',
    }
    // const FILTER = {
    //   paddingBottom: '50px';
    //
    // }
    return (
    <div className="col-md-10 space">
      <div className="row">
        <div className="col-md-8">
          <NewPostForm {...this.props} />
          <div className="row">
            { filtered.map((post, index) => {
                return (
                  <Post personalityMatches={personalityMatches} user={user} params={params}
                  dispatch={dispatch} key={index} post={post} />
                )
              })
            }
          </div>
        </div>
        <div className="col-md-2 select-category">
          <h4 className="small-title">Filter posts by category</h4>
            {
              this.props.categories.map((category, index) =>
                (
                  <div key={index} className="form-check">
                  <label className="form-check-label" style={CARDS}>
                    <Link className="linkto category" activeStyle={{
                      color: '#FFF',
                      background: '#0DD5FF',
                      padding: '2px 2px 2px 2px'
                    }} to={'/browse/' + this.props.user.username + '/' + category.name}>
                    {category.name}</Link>
                  </label>
                </div>
                )
              )
            }
        </div>

      </div>

    </div>
    )
  }
}

export default Browse;
