'use client';

import { useState } from 'react';
import css from './Friend.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Call } from '../icons/call.icon';
import { ChatsIcon } from '../icons/chats.icon';
import { Delete } from '../icons/delete.icon';
import { UsersList } from '@/store/counter/usersListSlice';
import { useRouter } from 'next/navigation';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  data: UsersList
}

export const Friend = ({data}: Props): JSX.Element => {
  // const [activeButtons, setActiveButtons] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className={css.wrapper}>
      <div className={css.wrapperData}>
        <div className={css.wrap}>
          {
            data.link_avatar === null ? (
              <div
                className={css.fakeAvatar}
              >
                <div className={css.avatarData}>
                  {data.name.slice(0, 1)}
                </div>
              </div>
            ) : (
              <img
                src={data.link_avatar}
                alt='Avatar'
                className={css.avatar}
              />
            )}
          <div className={css.name}>
            {data.name}
          </div>
        </div>
        <div className={css.buttonWrapper}>
          <button className={css.call}>
            <Call 
              color='#BB83FF'
            />
          </button>
          <button 
            className={css.button}
            onClick={() => router.push(`/chats/chat_with_user/${data.id}`)}
          >
            <ChatsIcon />
          </button>
          {/* <button className={css.delete}>
            <Delete />
            {i18n.t('delete')}
          </button> */}
        </div>
      </div>
      <div className={css.line} />
    </div>
  )
}