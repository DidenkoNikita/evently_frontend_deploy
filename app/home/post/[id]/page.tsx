'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import { store } from '@/store/store';
import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { User } from '@/store/counter/userSlice';
import { userGet } from '@/store/actions/getUser';
import { Post } from '@/store/counter/postsSlice';
import { getPost } from '@/store/actions/getPosts';
import { likePosts } from '@/store/actions/likePost';
import { Comment } from '@/store/counter/commentSlice';
import { getComment } from '@/store/actions/getComments';
import { Subscription } from '@/store/counter/subscriptionSlice';
import { getSubscriptions } from '@/store/actions/getSubscription';

import { Footer } from '@/components/Footer/Footer';
import { Heart } from '@/components/icons/heart.icon';
import { Message } from '@/components/icons/message.icon';
import { Forward } from '@/components/icons/forward.icon';
import { SharePost } from '@/components/SharePost/SharePost';
import { ActiveHeart } from '@/components/icons/activeHeart.icon';
import { SettingsHeader } from '@/components/SettingsHeader/SettingsHeader';

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function PostPage(): JSX.Element {
  const [postId, setPostId] = useState<string>('');
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [stateUserId, setStateUserId] = useState<number | string>('');
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect((): void => {
    store.dispatch(getPost());
    store.dispatch(userGet());
    store.dispatch(getComment());
    setPostId(location.pathname);
  }, []);

  useEffect((): void => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    } else {
      setStateUserId(JSON.parse(user_id || ''));
    }
    store.dispatch(getSubscriptions());
  }, [])
  
  const router = useRouter();

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

  const post_id: number = Number(postId.slice(11));
  const posts: Post[] = useSelector((state: State) => state.posts);
  const comments: Comment[] = useSelector((state: State) => state.comments);
  const filteredPost = posts.find((post) => post.id === post_id);
  const id: boolean | undefined = filteredPost?.like.includes(Number(stateUserId));
  const commentsFilter: Comment[] = comments.filter((comment) => comment.post_id === filteredPost?.id);
  const subscribtionFilter: Subscription | undefined = subscriptions.find((subscription) => subscription.brand_id === filteredPost?.brand_id);
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('publication')}
      />
      {
        activeModal && (
          <SharePost
            postId={post_id}
            setActiveModal={setActiveModal}
          />
        )
      }
      <div
        key={filteredPost?.id}
        className={theme ? css.darkPost : css.post}
      >
        <button
          className={theme ? css.darkHeader : css.header}
          onClick={() => {
            router.push(`/home/post/${filteredPost?.id}`)
          }}
        >
          <div className={css.avatarWrapper}>
            <img
              src={filteredPost?.link_avatar}
              width='37'
              height='37'
              alt="Avatar"
              className={theme ? css.darkAvatar : css.avatar}
            />
          </div>
          <div className={css.wrapperName}>
            <div className={theme ? css.darkName : css.name}>
              {filteredPost?.user_name}
            </div>
            <div className={theme ? css.darkType : css.type}>
              {filteredPost?.type}
            </div>
          </div>
          <div className={css.subscribe}>
            {subscribtionFilter ? i18n.t('subscribed') : i18n.t('subscribe')}
          </div>
        </button>
        <img
          src={filteredPost?.link_photo}
          width='414'
          height='414'
          alt="Photo's post"
          className={css.photo}
        />
        <div className={css.buttonWrapper}>
          <button
            onClick={() => {
              handleLike(Number(filteredPost?.id));
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
              {filteredPost?.like.length}
            </div>
          </button>
          <button
            onClick={() => router.push(`/home/post/comments/${filteredPost?.id}`)}
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
              setPostId(String(filteredPost?.id))
            }}
            className={theme ? css.darkButton : css.button}
          >
            {theme ? (
              <Forward color="#FFFFFF" />
            ) : (
              <Forward color="#000000" />
            )}
            <div className={theme ? css.darkQuantity : css.quantity}>
              0
            </div>
          </button>
        </div>
        <div className={theme ? css.darkText : css.text}>
          <span
            className={css.fullName}
          >
            {filteredPost?.user_name}</span>
          <span>
            {String(filteredPost?.title).length > 100 && expandedPostId !== filteredPost?.id ? filteredPost?.title.slice(0, 100) + '...' : filteredPost?.title}
          </span>
          {String(filteredPost?.title).length > 100 &&
            <a
              className={theme ? css.darkMore : css.more}
              onClick={() => handleTextToggle(Number(filteredPost?.id))}
            >
              {expandedPostId === filteredPost?.id ? i18n.t('less') : i18n.t('more')}
            </a>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}