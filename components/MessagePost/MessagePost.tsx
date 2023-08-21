'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

import { store } from "@/store/store";
import { State } from "@/store/initialState";
import { Post } from "@/store/counter/postsSlice";
import { getPost } from "@/store/actions/getPosts";
import { likePosts } from "@/store/actions/likePost";

import { Heart } from "../icons/heart.icon";
import { ActiveHeart } from "../icons/activeHeart.icon";
import { IMessage } from "@/store/counter/messageSlice";

import css from './MessagePost.module.css';

interface Props {
  message: IMessage;
  theme: boolean;
}

export const MessagePost = ({ 
  theme, 
  message
}: Props): JSX.Element => {
  const [id, setId] = useState<number | string>('');

  const time: Date = new Date(message.created_at);

  useEffect((): void => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId));
  }, [id]);

  useEffect((): void => {
    store.dispatch(getPost());
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const posts: Post[] = useSelector((state: State) => state.posts);

  const filteredPost: Post | undefined = posts.find((post) => post.id === message.post_id);

  const like: boolean | undefined = filteredPost?.like.includes(Number(id));

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
              <Image
                alt='photo'
                className={css.photo}
                src={String(filteredPost?.link_photo)}
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
              <Image
                alt='photo'
                className={css.photo}
                src={String(filteredPost?.link_photo)}
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
