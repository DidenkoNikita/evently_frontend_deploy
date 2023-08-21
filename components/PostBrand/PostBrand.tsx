'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { Post } from "@/store/counter/postsSlice";
import { likePosts } from "@/store/actions/likePost";
import { Comment } from "@/store/counter/commentSlice";
import { Subscription } from "@/store/counter/subscriptionSlice";

import { Heart } from "../icons/heart.icon";
import { Message } from "../icons/message.icon";
import { Forward } from "../icons/forward.icon";
import { ActiveHeart } from "../icons/activeHeart.icon";
import { getSubscriptions } from "@/store/actions/getSubscription";

import css from './PostBrand.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
  theme: boolean;
  setPostId: React.Dispatch<React.SetStateAction<number | null>>;
  setActiveShare: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostBrand = ({ 
  id, 
  theme, 
  setPostId, 
  setActiveShare
}: Props): JSX.Element => {
  const [stateUserId, setStateUserId] = useState<number | string>('');
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const router = useRouter();

  useEffect((): void => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    } else {
      setStateUserId(JSON.parse(user_id || ''));
    }
    store.dispatch(getSubscriptions());
  }, [router])


  const handleTextToggle = (postId: number): void => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  const subscriptions: Subscription[] = useSelector((state: State) => state.subscription);

  const handleLike = (post_id: number): void => {
    store.dispatch(likePosts(post_id));
  }

  const posts: Post[] = useSelector((state: State) => state.posts);
  const filteredPosts: Post[] = posts.filter((post) => post.brand_id === id);

  const comments: Comment[] = useSelector((state: State) => state.comments);

  const filterSupscription: Subscription | undefined = subscriptions.find((subscription) => subscription.brand_id === id);

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      {
        filteredPosts.map((post: Post) => {
          const id = post.like.includes(Number(stateUserId))
          const commentsFilter = comments.filter((comment: Comment) => comment.post_id === post.id)
          return (
            <div
              key={post.id}
              className={theme ? css.darkPost : css.post}
            >
              <button
                className={theme ? css.darkHeader : css.header}
                onClick={() => {
                  router.push(`/home/post/${post.id}`)
                }}
              >
                <div className={css.avatarWrapper}>
                  <Image
                    width='37'
                    height='37'
                    alt="Avatar"
                    src={post.link_avatar}
                    className={theme ? css.darkAvatar : css.avatar}
                  />
                </div>
                <div className={css.wrapperName}>
                  <div className={theme ? css.darkName : css.name}>
                    {post.user_name}
                  </div>
                  <div className={theme ? css.darkType : css.type}>
                    {post.type}
                  </div>
                </div>
                <div className={css.subscribe}>
                  {filterSupscription ? i18n.t('subscribed') : i18n.t('subscribe')}
                </div>
              </button>
              <Image
                width='414'
                height='414'
                alt="Photo's post"
                src={post.link_photo}
                className={css.photo}
              />
              <div className={css.buttonWrapper}>
                <button
                  onClick={() => {
                    handleLike(post.id)
                  }}
                  className={theme ? css.darkButton : css.button}
                >
                  {id ? (
                    <ActiveHeart />
                  ) : (
                    <Heart color={theme ? '#FFFFFF' : '#000000'} />
                  )}
                  <div className={theme ? css.darkQuantity : css.quantity}>
                    {post.like.length}
                  </div>
                </button>
                <button
                  className={theme ? css.darkButton : css.button}
                  onClick={() => router.push(`/home/post/comments/${post.id}`)}
                >
                  <Message color={theme ? '#FFFFFF' : '#000000'} />
                  <div className={theme ? css.darkQuantity : css.quantity}>
                    {commentsFilter.length}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveShare(true);
                    setPostId(post.id)
                  }}
                  className={theme ? css.darkButton : css.button}
                >
                  <Forward color={theme ? '#FFFFFF' : '#000000'} />
                  <div className={theme ? css.darkQuantity : css.quantity}>
                    0
                  </div>
                </button>
              </div>
              <div className={theme ? css.darkText : css.text}>
                <span className={css.fullName}>
                  {post.user_name}
                </span>
                <span>
                  {post.title.length > 100 && expandedPostId !== post.id ? post.title.slice(0, 100) + '...' : post.title}
                </span>
                {post.title.length > 100 &&
                  <a
                    className={theme ? css.darkMore : css.more}
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
