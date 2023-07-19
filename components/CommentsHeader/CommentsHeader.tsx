'use client';

import { Post } from "@/store/counter/postsSlice";

import css from './CommentsHeader.module.css';

interface CommentsHeader {
  post: Post | undefined
}

export const CommentsHeader = ({post}: CommentsHeader): JSX.Element => {

  return (
    <div className={css.header}>
      <div className={css.avatarWrapper}>
        <img
          width={48}
          height={48}
          alt="avatar"
          className={css.avatar}
          src={post?.link_avatar}
        />
      </div>
      <div className={css.wrapper}>
        <div className={css.userName}>
          {post?.user_name}
        </div>
        <div className={css.title}>
          {post?.title.slice(0, 39) + '...'}
        </div>
      </div>
    </div>
  )
}