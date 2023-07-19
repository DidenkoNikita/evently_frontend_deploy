import { ThunkAction } from "redux-thunk";
import { RooteState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { request } from "@/requests/request";
import { Post, likePost } from "../counter/postsSlice";

export const likePosts = (post_id: number): ThunkAction<
  void,
  RooteState,
  unknown,
  PayloadAction<Post>
> => async (dispatch): Promise<void | unknown> => {
  try {
    const data = await request('posts', {post_id}, 'POST');
    console.log('post id in action::', post_id);
    console.log('data in action::', data);
    
    
    if (data !== null) {
      dispatch(likePost(data));   
    }
  } catch(e) {
    return console.log(e);
  }
}