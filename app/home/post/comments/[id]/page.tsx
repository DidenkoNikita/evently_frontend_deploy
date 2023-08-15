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
import { Comment } from '@/store/counter/commentSlice';
import { getComment } from '@/store/actions/getComments';

import { Back } from '@/components/icons/back.icon';
import { Comments } from '@/components/Comments/Comments';
import { CommentsHeader } from '@/components/CommentsHeader/CommentsHeader';
import { CommentsFooter } from '@/components/CommentsFooter/CommentsFooter';

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function commentsInPost(): JSX.Element {
  const [postId, setPostId] = useState<string>('');

  const router = useRouter();

  useEffect((): void => {
    setPostId(location.pathname);
  }, [])

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(getPost());
    store.dispatch(getComment());
  }, [])

  const id: number = Number(postId.slice(20));

  const posts: Post[] = useSelector((state : State) => state.posts);
  const post: Post | undefined = posts.find((post: Post) => post.id === id);
  const comments: Comment[] = useSelector((state : State) => state.comments);
  const comment: Comment[] = comments.filter((comment: Comment) => comment.post_id === Number(id));
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  
  return (
    <div className={theme ? css.darkHeader : css.header}>
      <div className={css.wrapper}>
        <button
          onClick={() => {
            router.back()
          }}
          className={theme ? css.darkButtonBack : css.buttonBack} 
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {comment.length + ' '}{i18n.t('comments')}
        </div>
      </div>
      <CommentsHeader 
        post={post} 
        theme={theme}
      />
      <Comments theme={theme} />
      <CommentsFooter theme={theme} />
    </div>
  )
} 