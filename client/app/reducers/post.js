import {CREATE_NEW_POST, UPDATE_POST, DELETE_POST, FETCH_ALL_POSTS, FETCH_USER_POSTS, FILTER_POSTS, CLEAR_POSTS, FETCH_PUBLIC_POSTS, STARRED_POSTS_JOIN, GET_STARRED_POSTS, UPDATE_STARRED_POSTS} from '../actions/index.js'
import _ from 'underscore';

export function createNewPost (action) {
	const { user_id, username, category, category_id, id,
		content, title, tags, created_at, updated_at, gravatar} = action;
	return {
    title: title,
    created_at: Date.now(),
    updated_at: Date.now(),
    content: content,
    id: id,
    stars_count: 0,
    user: {
      username: username,
      id: user_id
    },
    category: {
      id: category_id,
      name: category,
			gravatar: gravatar
    },
    tags: tags
  }
}


export function starredPosts (state=[], action) {
  switch(action.type) {
    case GET_STARRED_POSTS:
      return [].concat(action.STARRED_POSTS_JOIN)
    default :
      return state;
  }
  return state;
}


export function userPosts (state=[], action) {
  switch(action.type) {
    case CREATE_NEW_POST:
      const newStuff = createNewPost(action.newPost)
      return [...state, {...newStuff, tags: newStuff.tags}];
    case FETCH_USER_POSTS:
      return action.fetchedUserPosts
    default :
      return state;
  }
  return state;
}


export function publicPosts (state=[], action) {
  switch(action.type) {
    case STARRED_POSTS_JOIN:
      let i = state.findIndex((post)=> post.id === action.postid)
      //console.log("state[i].stars_count + action.flag", 10 + action.flag)
      if(i === -1) {
        return state;
      }
      return  [...state.slice(0, i),
              { ...state[i],
                stars_count: state[i].stars_count + action.flag
              },
              ...state.slice(i + 1)
              ];
    case FETCH_PUBLIC_POSTS:
      return [].concat(action.fetchedPublicPosts)
    default :
      return state;
  }
  return state;
}


export function allPosts (state=[], action) {
  switch(action.type) {
    case UPDATE_STARRED_POSTS:
      const {userid, posts, starredPosts} = action;
      return posts.map((post) => {
        for(var i = 0; i < starredPosts.length; i++) {
          if(post.id === starredPosts[i].star_id) {
            post.isStarred = true;
            return post;
          }
        }
        post.isStarred = false;
        return post;
      })
    case STARRED_POSTS_JOIN:
      let i = state.findIndex((post) => post.id === action.postid)
      if(i === -1) {
          return state;
      }
      if(!action.flag) {
        var operation = -1;
      } else {
        var operation = 1;
      }
      return  [...state.slice(0, i),
              {...state[i],
                stars_count: state[i].stars_count + operation,
                isStarred: action.flag
              },
              ...state.slice(i + 1)
              ];
    case FETCH_ALL_POSTS:
      return [].concat(action.fetchedPosts);
    case FILTER_POSTS:
      return state.filter((post) => {
        return post.category.name === action.category;
      })
    case CLEAR_POSTS:
      return [];
    default :
      return state;
  }
  return state;
}
