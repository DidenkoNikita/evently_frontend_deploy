'use client';

import Image from "next/image";

import { Post } from "@/store/counter/postsSlice";

import css from './CommentsHeader.module.css';

interface CommentsHeader {
  post: Post | undefined;
  theme: boolean;
}

export const CommentsHeader = ({ 
  post, 
  theme 
}: CommentsHeader): JSX.Element => {

  return (
    <div className={css.header}>
      <div className={css.avatarWrapper}>
        <Image
          width={48}
          height={48}
          alt="avatar"
          className={css.avatar}
          src={String(post?.link_avatar)}
        />
      </div>
      <div className={css.wrapper}>
        <div className={theme ? css.darkUserName : css.userName}>
          {post?.user_name}
        </div>
        <div className={theme ? css.darkTitle : css.title}>
          {post?.title.slice(0, 39) + '...'}
        </div>
      </div>
    </div>
  )
}