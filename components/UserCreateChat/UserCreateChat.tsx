'use client';

import { useRouter } from 'next/navigation';
import { ChatsIcon } from '../icons/chats.icon'
import { Phone } from '../icons/phone.icon'
import css from './UserCreateChat.module.css'
import { store } from '@/store/store';
import { createChat } from '@/store/actions/createChat';

interface User {
  id: number;
  name: string;
  linkAvatar: string
}

export const UserCreateChat = ({id, name, linkAvatar}: User): JSX.Element => {
  const router = useRouter();
  
  return (
    <div>
      <div className={css.chat}>
        <div className={css.dataWrapper}>
          {linkAvatar === null ? (
            <div 
              className={css.fakeAvatar} 
            >
              <div className={css.avatarData}>
                {name.slice(0, 1)}
              </div>
            </div>
          ) : (
            <div className={css.avatarWrapper}>
              <img 
                src={linkAvatar}
                className={css.avatar}
              />
            </div>
          )}
          <div 
            className={css.name}
          >
            {name}
          </div>
        </div>
        <div className={css.buttonsWrapper}>
          <button className={css.phoneButton}>
            <Phone />
          </button>
          <button 
            onClick={() => {
              store.dispatch(createChat(id))
              router.push(`/chats/chat_with_user/${id}`)
            }}
            className={css.chatButton}
          >
            <ChatsIcon />
          </button>
        </div>
      </div>
      <div className={css.line} />
    </div>
  )
}