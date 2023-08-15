'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { store } from '@/store/store';
import { State } from '@/store/initialState';
import { IChat } from '@/store/counter/chatSLice';
import { createChat } from '@/store/actions/createChat';
import { UsersList } from '@/store/counter/usersListSlice';

import { Phone } from '../icons/phone.icon';
import { ChatsIcon } from '../icons/chats.icon';

import css from './UserCreateChat.module.css';

interface User {
  user: UsersList;
  theme: boolean;
}

export const UserCreateChat = ({
  user,
  theme
}: User): JSX.Element => {
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();

  useEffect((): void => {
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(user_id));
  }, [])

  const chats: IChat[] = useSelector((state: State) => state.chats);

  const filteredChat: IChat | undefined = chats.find((chat) => chat.users_id.includes(user.id));

  return (
    <div>
      <div className={css.chat}>
        <button
          className={css.dataWrapper}
          onClick={() => {
            router.push(`/home/profile/friends/profile_friend/${user?.id}`)
          }}
        >
          {user.link_avatar === null ? (
            <div
              className={css.fakeAvatar}
            >
              <div className={theme ? css.darkAvatarData : css.avatarData}>
                {user.name.slice(0, 1)}
              </div>
            </div>
          ) : (
            <div className={css.avatarWrapper}>
              <img
                src={user.link_avatar}
                className={css.avatar}
              />
            </div>
          )}
          <div
            className={theme ? css.darkName : css.name}
          >
            {user.name}
          </div>
        </button>
        <div className={css.buttonsWrapper}>
          <button className={css.phoneButton}>
            <Phone />
          </button>
          {
            !user.messageConfidentiality.nobody &&
              (user.messageConfidentiality.my_friends && user.friends_id.find((id) => id === userId)) ||
              user.messageConfidentiality.all ? (
              <button
                className={css.chatButton}
                onClick={() => {
                  if (filteredChat) {
                    router.push(`/chats/chat_with_user/${user.id}`);
                  } else {
                    store.dispatch(createChat(user.id))
                    router.push(`/chats/chat_with_user/${user.id}`)
                  }
                }}
              >
                <ChatsIcon color='#000000' />
              </button>
            ) : (
              null
            )
          }
        </div>
      </div>
      <div className={theme ? css.darkLine : css.line} />
    </div>
  )
}