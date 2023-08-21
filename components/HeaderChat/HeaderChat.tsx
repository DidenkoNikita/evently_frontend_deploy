'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { store } from '@/store/store';
import { IMessage } from '@/store/counter/messageSlice';
import { deleteChat } from '@/store/actions/deleteChat';
import { getUserList } from '@/store/actions/getUserList';

import { Back } from '../icons/back.icon';

import css from './HeaderChat.module.css'

interface Data {
  theme: boolean;
  chatId: number | null;
  name: string | undefined;
  filterMessage: IMessage[];
  linkAvatar: string | undefined;
}

export const HeaderChat = ({
  name, 
  theme,
  chatId, 
  linkAvatar, 
  filterMessage
}: Data): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const router = useRouter();  

  useEffect((): void => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(22));

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
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
        <Back color={theme ? '#FFFFFF' : '#000000'} />
      </button>
      <div className={css.titleWrapper}>
        <button 
          className={theme ? css.darkTitle : css.title}
          onClick={() => router.push(`/chats/chat_settings/${id}`)}
        >
          {name}
        </button>
        {linkAvatar === null ? (
            <button
              className={css.fakeAvatar} 
              onClick={() => router.push(`/chats/chat_settings/${id}`)}
            >
              <div className={theme ? css.darkAvatarData : css.avatarData}>
                {name?.slice(0, 1)}
              </div>
            </button>
          ) : (
            <button 
              className={css.avatarWrapper}
              onClick={() => router.push(`/chats/chat_settings/${id}`)}
            >
              <Image
                alt='avatar'
                src={String(linkAvatar)}
                className={css.avatar}
              />
            </button>
          )}
      </div>
    </div>
  </div>
  )
}