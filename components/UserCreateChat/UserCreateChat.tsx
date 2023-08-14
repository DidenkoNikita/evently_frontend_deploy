'use client';

import { useRouter } from 'next/navigation';
import { ChatsIcon } from '../icons/chats.icon'
import { Phone } from '../icons/phone.icon'
import css from './UserCreateChat.module.css'
import { store } from '@/store/store';
import { createChat } from '@/store/actions/createChat';
import { useSelector } from 'react-redux';
import { State } from '@/store/initialState';
import { UsersList } from '@/store/counter/usersListSlice';
import { useEffect, useState } from 'react';

interface User {
  user: UsersList;
  theme: boolean;
}

export const UserCreateChat = ({ user, theme }: User): JSX.Element => {
  const [userId, setUserId] = useState<number | null>(null);

  console.log(userId);
  
  const router = useRouter();

  useEffect(() => {
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(user_id));
  }, [])

  const chats = useSelector((state: State) => state.chats);
  console.log(chats);

  const filteredChat = chats.find((chat) => chat.users_id.includes(user.id));
  console.log('check chat', filteredChat);

  console.log(user.messageConfidentiality.my_friends , user.friends_id.find((id) => id === userId));
  

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
                onClick={() => {
                  if (filteredChat) {
                    router.push(`/chats/chat_with_user/${user.id}`);
                  } else {
                    store.dispatch(createChat(user.id))
                    router.push(`/chats/chat_with_user/${user.id}`)
                  }
                }}
                className={css.chatButton}
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