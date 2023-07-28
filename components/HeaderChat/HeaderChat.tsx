'use client';

interface Title {
  name: string | undefined;
  linkAvatar: string | undefined;
}

import { useRouter } from 'next/navigation';
import css from './HeaderChat.module.css'
import { Back } from '../icons/back.icon';
import { useEffect, useState } from 'react';
import { getUserList } from '@/store/actions/getUserList';
import { store } from '@/store/store';

export const HeaderChat = ({name, linkAvatar}: Title): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(22));
  console.log(id);

  return (
    <div className={css.headerWrapper}>
    <div className={css.header}>
      <button
        onClick={() => {
          router.push('/chats');
        }}
        className={css.iconButton}
      >
        <Back />
      </button>
      <div className={css.titleWrapper}>
        <button 
          className={css.title}
          onClick={() => router.push(`/chats/chat_settings/${id}`)}
        >
          {name}
        </button>
        {linkAvatar === null ? (
            <button
              className={css.fakeAvatar} 
              onClick={() => router.push(`/chats/chat_settings/${id}`)}
            >
              <div className={css.avatarData}>
                {name?.slice(0, 1)}
              </div>
            </button>
          ) : (
            <button 
              className={css.avatarWrapper}
              onClick={() => router.push(`/chats/chat_settings/${id}`)}
            >
              <img 
                src={linkAvatar}
                className={css.avatar}
              />
            </button>
          )}
      </div>
    </div>
  </div>
  )
}