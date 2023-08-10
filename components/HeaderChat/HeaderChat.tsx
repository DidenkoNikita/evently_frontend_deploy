'use client';

interface Data {
  name: string | undefined;
  linkAvatar: string | undefined;
  filterMessage: IMessage[];
  chatId: number | null;
}

import { useRouter } from 'next/navigation';
import css from './HeaderChat.module.css'
import { Back } from '../icons/back.icon';
import { useEffect, useState } from 'react';
import { getUserList } from '@/store/actions/getUserList';
import { store } from '@/store/store';
import { IMessage } from '@/store/counter/messageSlice';
import { deleteChat } from '@/store/actions/deleteChat';

export const HeaderChat = ({name, linkAvatar, filterMessage, chatId}: Data): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();  

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(22));

  return (
    <div className={css.headerWrapper}>
    <div className={css.header}>
      <button
        onClick={() => {
          if (filterMessage.length > 0) {
            router.push('/chats');
          } else {
            store.dispatch(deleteChat(chatId))
            router.push('/chats');
          }
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