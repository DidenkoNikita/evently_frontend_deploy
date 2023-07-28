import { IChat } from "./counter/chatSLice";
import { Comment } from "./counter/commentSlice";
import { IMessage } from "./counter/messageSlice";
import { Post } from "./counter/postsSlice"
import { User } from "./counter/userSlice";
import { UsersList } from "./counter/usersListSlice";

export interface State {
  posts: Post[];
  comments: Comment[];
  user: User;
  usersList: UsersList[];
  chats: IChat[];
  messages: IMessage[];
}

export const initialState: State = {
  posts: [],
  comments: [],
  user: {} as User,
  usersList: [],
  chats: [],
  messages: []
}