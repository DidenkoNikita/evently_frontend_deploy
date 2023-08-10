'use client';

import { useEffect, useState } from "react";

import css from './PostComponent.module.css'
import { Heart } from "../icons/heart.icon";
import { Message } from "../icons/message.icon";
import { Forward } from "../icons/forward.icon";
import i18n from "i18next";

import resources from "@/locales/resource";
import { ActiveHeart } from "../icons/activeHeart.icon";
import { useRouter } from "next/navigation";
import { store } from "@/store/store";
import { useSelector } from "react-redux";
import { likePosts } from "@/store/actions/likePost";
import { Comment } from "@/store/counter/commentSlice";
import { State } from "@/store/initialState";
import { Post } from "@/store/counter/postsSlice";
import { getSubscriptions } from "@/store/actions/getSubscription";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  setActiveModal: any;
  setStateData: any;
}

export const PostComponent = ({setActiveModal, setStateData}: Props): JSX.Element => {
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [stateUserId, setStateUserId] = useState<number | string>('');
  const router = useRouter()

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    } else {
      setStateUserId(JSON.parse(user_id || ''));
    }
    store.dispatch(getSubscriptions());
  }, [])


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

  const posts: Post[] = useSelector((state: State) => state.posts);
  const comments: Comment[] = useSelector((state: State) => state.comments);
  const subscriptions = useSelector((state: State) => state.subscription);

  console.log(posts);

  return (
    <div className={css.wrapper}>
      {
        posts.map((post: Post) => {
          const id = post.like.includes(Number(stateUserId));
          const commentsFilter = comments.filter((comment: Comment) => comment.post_id === post.id);
          const subscribtionFilter = subscriptions.find((subscription) => subscription.brand_id === post.brand_id);

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
                <div className={css.wrapperName}>
                  <div className={css.name}>
                    {post.user_name}
                  </div>
                  <div className={css.type}>
                    {post.type}
                  </div>
                </div>
                <div className={css.subscribe}>{subscribtionFilter ? i18n.t('subscribed') : i18n.t('subscribe')}</div>
              </div>
              <img
                src={post.link_photo}
                width='414'
                height='414'
                alt="Photo's post"
                className={css.photo}
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
                <button 
                  className={css.button}
                  onClick={() => {
                    setActiveModal(true);
                    setStateData({
                      post_id: post.id, 
                      post_name: post.user_name, 
                      link_photo: post.link_photo, 
                      text: post.title.slice(0, 20) + '...'
                    })
                  }}
                >
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
