import { combineReducers } from 'redux';
import { postSlice } from './counter/postsSlice';
import { commentSlice } from './counter/commentSlice';
import { userSlice } from './counter/userSlice';
import { usersListSlice } from './counter/usersListSlice';
import { chatSlice } from './counter/chatSLice';
import { messageSlice } from './counter/messageSlice';

export const rootReducer = combineReducers({
  posts: postSlice.reducer,
  comments: commentSlice.reducer,
  user: userSlice.reducer,
  usersList: usersListSlice.reducer,
  chats: chatSlice.reducer,
  messages: messageSlice.reducer
});