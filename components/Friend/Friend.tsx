'use client';

import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import { store } from '@/store/store';
import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { createChat } from '@/store/actions/createChat';
import { UsersList } from '@/store/counter/usersListSlice';

import { Call } from '../icons/call.icon';
import { ChatsIcon } from '../icons/chats.icon';

import css from './Friend.module.css';
import { IChat } from '@/store/counter/chatSLice';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  data: UsersList;
}

export const Friend = ({
  data,
  theme
}: Props): JSX.Element => {
  const chats: IChat[] = useSelector((state: State) => state.chats);
  const filteredChat: IChat | undefined = chats.find((chat) => chat.users_id.includes(data.id));

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
                <div className={theme ? css.darkAvatarData : css.avatarData}>
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
          <div className={theme ? css.darkName : css.name}>
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
            onClick={() => {
              if (filteredChat) {
                router.push(`/chats/chat_with_user/${data.id}`);
              } else {
                store.dispatch(createChat(data.id))
                router.push(`/chats/chat_with_user/${data.id}`)
              }
            }}
          >
            <ChatsIcon color='#000000' />
          </button>
        </div>
      </div>
      <div className={theme ? css.darkLine : css.line} />
    </div>
  )
}