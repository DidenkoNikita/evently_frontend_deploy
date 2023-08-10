'use client';

import { useEffect, useState } from "react";

import css from './MessagePost.module.css';
import { IMessage } from "@/store/counter/messageSlice";
import { Heart } from "../icons/heart.icon";
import { store } from "@/store/store";
import { likePosts } from "@/store/actions/likePost";
import { getPost } from "@/store/actions/getPosts";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { ActiveHeart } from "../icons/activeHeart.icon";

interface Props {
  message: IMessage
}

export const MessagePost = ({ message }: Props): JSX.Element => {
  const [id, setId] = useState<number | string>('');

  const time = new Date(message.created_at);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId));
  }, [id]);

  useEffect(() => {
    store.dispatch(getPost());
  }, [])
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const posts = useSelector((state: State) => state.posts);

  const filteredPost = posts.find((post) => post.id === message.post_id);

  const like = filteredPost?.like.includes(Number(id));

  console.log(message.user_id, id);
  
  return (
    <div className={message.user_id === id ? css.wrapper : css.receivedwrapper}>
      {
        message.user_id === id ? (
          <div className={css.postWrapper}>
            <button 
              className={css.button}
              onClick={() => {
                store.dispatch(likePosts(Number(message.post_id)));
              }}
            >
              {like ? <ActiveHeart /> : <Heart />}
            </button>
            <div className={css.post}>
              <img
                src={message.link_photo?.toString()}
                className={css.photo}
              />
              <div className={css.wrapperData}>
                <div className={css.textWrapper}>
                  <div className={css.name}>
                    {message.post_name}
                  </div>
                  <div className={css.title}>
                    {message.text}
                  </div>
                </div>
                <div className={css.datePost}>
                  {`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={css.postWrapper}>
            <div className={css.post}>
              <img
                src={message.link_photo?.toString()}
                className={css.photo}
              />
              <div className={css.wrapperData}>
                <div className={css.textWrapper}>
                  <div className={css.name}>
                    {message.post_name}
                  </div>
                  <div className={css.title}>
                    {message.text}
                  </div>
                </div>
                <div className={css.datePost}>
                  {`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}
                </div>
              </div>
            </div>
            <button 
              className={css.button}
              onClick={() => {
                store.dispatch(likePosts(Number(message.post_id)));
              }}
            >
              {like ? <ActiveHeart /> : <Heart />}
            </button>
          </div>
        )
      }
    </div>
  )
}
