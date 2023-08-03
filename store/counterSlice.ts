import { combineReducers } from 'redux';
import { postSlice } from './counter/postsSlice';
import { commentSlice } from './counter/commentSlice';
import { userSlice } from './counter/userSlice';
import { usersListSlice } from './counter/usersListSlice';
import { chatSlice } from './counter/chatSLice';
import { messageSlice } from './counter/messageSlice';
import { notificationSlice } from './counter/notificationSlice';

export const rootReducer = combineReducers({
  posts: postSlice.reducer,
  comments: commentSlice.reducer,
  user: userSlice.reducer,
  usersList: usersListSlice.reducer,
  chats: chatSlice.reducer,
  messages: messageSlice.reducer,
  notifications: notificationSlice.reducer
});