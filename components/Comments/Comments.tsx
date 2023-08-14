'use client';

import { Comment } from '@/store/counter/commentSlice';
import { Heart } from '../icons/heart.icon'
import css from './Comments.module.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { store } from '@/store/store';
import { getComment } from '@/store/actions/getComments';
import { commentLike } from '@/store/actions/commentLike';
import { ActiveHeart } from '../icons/activeHeart.icon';

import moment from 'moment';
import { State } from '@/store/initialState';

interface Props {
  theme: boolean;
}

export const Comments = ({ theme }: Props): JSX.Element => {
  const [postId, setPostId] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('')

  useEffect(() => {
    setPostId(location.pathname);
    store.dispatch(getComment());
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '')
    setUserId(user_id)
  }, [])
  const id: number = Number(postId.slice(20))

  const comments: Comment[] = useSelector((state: State) => state.comments.filter((comment: Comment) => comment?.post_id === id).sort((a, b) => a.id - b.id));
  console.log(comments);
  
  const handleLike = (comment_id: number) => {
    store.dispatch(commentLike(comment_id));
  }

  const formatTime = (dateString: string) => {
    const date = moment(dateString);

    const now = moment();
    const diff = now.diff(date, 'minutes');
    const formattedDate = date.format('h:mm a');

    if (diff < 60) {
      return formattedDate;
    } else if (diff < 24 * 60) {
      return `Yesterday at ${formattedDate}`;
    } else if (diff < 30 * 24 * 60) {
      const daysAgo = Math.floor(diff / (24 * 60));
      return `${daysAgo} days ago at ${formattedDate}`;
    } else if (diff < 12 * 30 * 24 * 60) {
      const monthsAgo = Math.floor(diff / (30 * 24 * 60));
      return `${monthsAgo} months ago at ${formattedDate}`;
    } else {
      const yearsAgo = Math.floor(diff / (12 * 30 * 24 * 60));
      return `${yearsAgo} years ago at ${formattedDate}`;
    }
  };
  return (
    <div className={theme ? css.darkCommentsWrapper : css.commentsWrapper}>
      {comments.map((comment: Comment) => {
        const like = comment.like.filter((comment) => comment === userId);
        return (
          <div
            key={comment.id}
            className={theme ? css.darkComment : css.comment}
          >
            <div className={css.commentHeader}>
              {comment.link_avatar === null ? (
                <div
                  className={css.fakeAvatar}
                >
                  <div className={theme ? css.darkAvatarData : css.avatarData}>
                    {comment.name.slice(0, 1)}
                  </div>
                </div>
              ) : (
                <div className={css.avatarWrapper}>
                  <img
                    src={comment.link_avatar}
                    className={css.avatar}
                  />
                </div>
              )}
              <div className={css.wrapperData}>
                <div className={theme ? css.darkName : css.name}>
                  {comment.name}
                </div>
                <div className={theme ? css.darkTime : css.time}>
                  {formatTime(comment.created_at)}
                </div>
              </div>
            </div>
            <div className={theme ? css.darkText : css.text}>
              {comment.text}
            </div>
            <button
              className={theme ? css.darkButton : css.button}
              onClick={() => handleLike(comment.id)}
            >
              {comment.like.length}
              {like.length > 0 ? <ActiveHeart /> : <Heart color={theme ? '#FFF' : '#000'} />}
            </button>
          </div>
        )
      })}
    </div>
  )
}