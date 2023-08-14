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
import { useRouter } from "next/navigation";

interface Props {
  message: IMessage;
  theme: boolean;
}

export const MessagePost = ({ message, theme }: Props): JSX.Element => {
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

  const router = useRouter();
  
  return (
    <div className={message.user_id === id ? css.wrapper : css.receivedwrapper}>
      {
        message.user_id === id ? (
          <div className={css.postWrapper}>
            <button 
              className={theme ? css.darkButton : css.button}
              onClick={() => {
                store.dispatch(likePosts(Number(message.post_id)));
              }}
            >
              {like ? <ActiveHeart /> : <Heart color={theme ? '#FFFFFF' : '#000000'} />}
            </button>
            <button 
              className={theme ? css.darkPost : css.post}
              onClick={() => {
                router.push(`/home/post/${message.post_id}`)
              }}
            >
              <img
                src={filteredPost?.link_photo}
                className={css.photo}
              />
              <div className={css.wrapperData}>
                <div className={css.textWrapper}>
                  <div className={theme ? css.darkName : css.name}>
                    {filteredPost?.user_name}
                  </div>
                  <div className={theme ? css.darkTitle : css.title}>
                    {filteredPost?.title.slice(0, 20) + '...'}
                  </div>
                </div>
                <div className={theme ? css.darkDatePost : css.datePost}>
                  {`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className={css.postWrapper}>
            <button 
              className={theme ? css.darkPost : css.post}
              onClick={() => {
                router.push(`/home/post/${message.post_id}`)
              }}
            >
              <img
                src={filteredPost?.link_photo}
                className={css.photo}
              />
              <div className={css.wrapperData}>
                <div className={css.textWrapper}>
                  <div className={theme ? css.darkName : css.name}>
                    {filteredPost?.user_name}
                  </div>
                  <div className={theme ? css.darkTitle : css.title}>
                    {filteredPost?.title.slice(0, 20) + '...'}
                  </div>
                </div>
                <div className={theme ? css.darkDatePost : css.datePost}>
                  {`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}
                </div>
              </div>
            </button>
            <button 
              className={theme ? css.darkButton : css.button}
              onClick={() => {
                store.dispatch(likePosts(Number(message.post_id)));
              }}
            >
              {like ? <ActiveHeart /> : <Heart color={theme ? '#FFFFFF' : '#000000'} />}
            </button>
          </div>
        )
      }
    </div>
  )
}
