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
  setPostId: any;
}

export const PostComponent = ({ setActiveModal, setPostId }: Props): JSX.Element => {
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
  const user = useSelector((state: State) => state.user);

  const theme = user?.user?.color_theme;

  console.log(posts);

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      {
        posts.map((post: Post) => {
          const id = post.like.includes(Number(stateUserId));
          const commentsFilter = comments.filter((comment: Comment) => comment.post_id === post.id);
          const subscribtionFilter = subscriptions.find((subscription) => subscription.brand_id === post.brand_id);

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
                  <img
                    src={post.link_avatar}
                    width='37'
                    height='37'
                    alt="Avatar"
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
                <div className={css.subscribe}>{subscribtionFilter ? i18n.t('subscribed') : i18n.t('subscribe')}</div>
              </button>
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
                  className={theme ? css.darkButton : css.button}
                >
                  {id ? (
                    <ActiveHeart />
                  ) : (
                    theme ? (
                      <Heart color="#FFFFFF" />
                    ) : (
                      <Heart color="#000000" />
                    ))}
                  <div className={theme ? css.darkQuantity : css.quantity}>
                    {post.like.length}
                  </div>
                </button>
                <button
                  onClick={() => router.push(`/home/post/comments/${post.id}`)}
                  className={theme ? css.darkButton : css.button}
                >
                  {theme ? (
                    <Message color="#FFFFFF" />
                  ) : (
                    <Message color="#000000" />
                  )}
                  <div className={theme ? css.darkQuantity : css.quantity}>
                    {commentsFilter.length}
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveModal(true);
                    setPostId(post.id)
                  }}
                  className={theme ? css.darkButton : css.button}
                >
                  {theme ? (
                    <Forward color="#FFFFFF" />
                  ) : (
                    <Forward color="#000000" />
                  )}
                  <div className={theme ? css.darkQuantity : css.quantity}>0</div>
                </button>
              </div>
              <div className={theme ? css.darkText : css.text}>
                <span
                  className={css.fullName}
                >
                  {post.user_name}</span>
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
