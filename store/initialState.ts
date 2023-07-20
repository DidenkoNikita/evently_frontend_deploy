import { Comment } from "./counter/commentSlice";
import { Post } from "./counter/postsSlice"
import { User } from "./counter/userSlice";

interface State {
  posts: Post[];
  comments: Comment[];
  user: User
}

export const initialState: State = {
  posts: [],
  comments: [],
  user: {} as User
}