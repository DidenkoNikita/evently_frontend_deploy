'use client';

import { Back } from '@/components/icons/back.icon';
import css from './page.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { useRouter } from 'next/navigation';
import { CommentsHeader } from '@/components/CommentsHeader/CommentsHeader';
import { Post } from '@/store/counter/postsSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CommentsFooter } from '@/components/CommentsFooter/CommentsFooter';
import { store } from '@/store/store';
import { getPost } from '@/store/actions/getPosts';
import { Comments } from '@/components/Comments/Comments';
import { getComment } from '@/store/actions/getComments';
import { Comment } from '@/store/counter/commentSlice';
import { State } from '@/store/initialState';
import { userGet } from '@/store/actions/getUser';

i18n.init({
  resources,
  lng: "en"
});

export default function commentsInPost(): JSX.Element {
  const router = useRouter();
  const [postId, setPostId] = useState<string>(''); 

  useEffect(() => {
    setPostId(location.pathname)
  }, [])

  useEffect(() => {
    store.dispatch(getPost());
    store.dispatch(getComment());
    store.dispatch(userGet());
  }, [])

  const id = Number(postId.slice(20))
  
  const posts: Post[] = useSelector((state : State) => state.posts);
  const post: Post | undefined = posts.find((post: Post) => post.id === id);

  const comments: Comment[] = useSelector((state : State) => state.comments);
  
  const comment = comments.filter((comment: Comment) => comment.post_id === Number(id));
  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;
  
  return (
    <div className={theme ? css.darkHeader : css.header}>
      <div className={css.wrapper}>
        <button
          onClick={() => {router.back()}}
          className={theme ? css.darkButtonBack : css.buttonBack} >
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