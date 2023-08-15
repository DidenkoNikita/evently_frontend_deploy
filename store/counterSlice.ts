import { combineReducers } from 'redux';

import { chatSlice } from './counter/chatSLice';
import { userSlice } from './counter/userSlice';
import { postSlice } from './counter/postsSlice';
import { brandSLice } from './counter/brandSlice';
import { eventSLice } from './counter/eventSlice';
import { reviewSlice } from './counter/reviewSlice';
import { commentSlice } from './counter/commentSlice';
import { messageSlice } from './counter/messageSlice';
import { usersListSlice } from './counter/usersListSlice';
import { notificationSlice } from './counter/notificationSlice';
import { subscriptionSLice } from './counter/subscriptionSlice';

export const rootReducer = combineReducers({
  posts: postSlice.reducer,
  comments: commentSlice.reducer,
  user: userSlice.reducer,
  usersList: usersListSlice.reducer,
  chats: chatSlice.reducer,
  messages: messageSlice.reducer,
  notifications: notificationSlice.reducer,
  brand: brandSLice.reducer,
  review: reviewSlice.reducer,
  event: eventSLice.reducer,
  subscription: subscriptionSLice.reducer
});