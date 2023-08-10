import { Brand } from "./counter/brandSlice";
import { IChat } from "./counter/chatSLice";
import { Comment } from "./counter/commentSlice";
import { IMessage } from "./counter/messageSlice";
import { Notification } from "./counter/notificationSlice";
import { Post } from "./counter/postsSlice"
import { User } from "./counter/userSlice";
import { UsersList } from "./counter/usersListSlice";
import { Review } from "./counter/reviewSlice";
import { Event } from "./counter/eventSlice";
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