import { combineReducers } from 'redux';
import { postSlice } from './counter/postsSlice';
import { commentSlice } from './counter/commentSlice';
import { userSlice } from './counter/userSlice';

export const rootReducer = combineReducers({
  posts: postSlice.reducer,
  comments: commentSlice.reducer,
  user: userSlice.reducer
});