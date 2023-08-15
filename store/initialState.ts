import { User } from "./counter/userSlice";
import { Post } from "./counter/postsSlice";
import { IChat } from "./counter/chatSLice";
import { Event } from "./counter/eventSlice";
import { Brand } from "./counter/brandSlice";
import { Review } from "./counter/reviewSlice";
import { Comment } from "./counter/commentSlice";
import { IMessage } from "./counter/messageSlice";
import { UsersList } from "./counter/usersListSlice";
import { Notification } from "./counter/notificationSlice";
import { Subscription } from "./counter/subscriptionSlice";

export interface State {
  posts: Post[];
  comments: Comment[];
  user: User;
  usersList: UsersList[];
  chats: IChat[];
  messages: IMessage[];
  notifications: Notification[];
  brand: Brand[];
  review: Review[];
  event: Event[];
  subscription: Subscription[];
}

export const initialState: State = {
  posts: [],
  comments: [],
  user: {} as User,
  usersList: [],
  chats: [],
  messages: [],
  notifications: [],
  brand: [],
  review: [],
  event: [],
  subscription: []
}