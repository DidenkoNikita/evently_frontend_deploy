'use client';

import { useEffect, useState } from "react";

import css from './Post.module.css'
import { Heart } from "../icons/heart.icon";
import { Message } from "../icons/message.icon";
import { Forward } from "../icons/forward.icon";
import i18n from "i18next";

import resources from "@/locales/resource";
import { ActiveHeart } from "../icons/activeHeart.icon";
import { useRouter } from "next/navigation";
import { store } from "@/store/store";
import { getPost } from "@/store/actions/getPosts";
import { useSelector } from "react-redux";
import { likePosts } from "@/store/actions/likePost";
import { Comment } from "@/store/counter/commentSlice";
import { User } from "@/store/counter/userSlice";

i18n.init({
  resources,
  lng: "en"
});

interface Post {
  id: number;
  link_photo: string;
  link_avatar: string;
  user_name: string;
  title: string;
  like: number[];
}

export interface State {
  posts: Post[]
  comments: Comment[],
  user: User[]
}


export const Post = (): JSX.Element => {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [stateUserId, setStateUserId] = useState<number | string>('');

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem('user_id') || '');
    setStateUserId(user_id);
  }, [])

  const router = useRouter()

  const handleTextToggle = (postId: number) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  const handleLike = (post_id: number) => {    
    store.dispatch(likePosts(post_id));
  } 

  const posts: Post[] = useSelector((state : State) => state.posts);
  const comments: Comment[] = useSelector((state : State) => state.comments);

  return (
    <div className={css.wrapper}>
      {
        posts.map((post: Post) => {
          const id = post.like.includes(Number(stateUserId))
          const commentsFilter =  comments.filter((comment: Comment) => comment.post_id === post.id)
          
          return (
          <div
            key={post.id}
            className={css.post}
          >
            <div className={css.header}>
              <div className={css.avatarWrapper}>
                <img
                  src={post.link_avatar}
                  width='37'
                  height='37'
                  alt="Avatar"
                  className={css.avatar}
                />
              </div>
              <div className={css.name}>
                {post.user_name}
              </div>
              <div className={css.subscribe}>{i18n.t('subscribe')}</div>
            </div>
            <img
              src={post.link_photo}
              width='414'
              height='414'
              alt="Photo's post"
            />
            <div className={css.buttonWrapper}>
              <button 
                onClick={() => {
                  handleLike(post.id)
                }}
                className={css.button}
              >
                {id ? <ActiveHeart /> : <Heart />}
                <div className={css.quantity}>
                  {post.like.length}
                </div>
              </button>
              <button 
                onClick={() => router.push(`/home/post/comments/${post.id}`)}
                className={css.button}
              >
                <Message />
                <div className={css.quantity}>{commentsFilter.length}</div>
              </button>
              <button className={css.button}>
                <Forward />
                <div className={css.quantity}>0</div>
              </button>
            </div>
            <div className={css.text}>
              <span className={css.fullName}>{post.user_name}</span>
              <span>{post.title.length > 100 && expandedPostId !== post.id ? post.title.slice(0, 100) + '...' : post.title}</span>
              {post.title.length > 100 &&
                <a
                  className={css.more}
                  onClick={() => handleTextToggle(post.id)}
                >
                  {expandedPostId === post.id ? i18n.t('less') : i18n.t('more')}
                </a>
              }
            </div>
          </div>
          )
        })
      }
    </div>
  );
}
