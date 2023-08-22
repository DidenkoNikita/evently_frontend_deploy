'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { Post } from "@/store/counter/postsSlice";
import { deleteChat } from "@/store/actions/deleteChat";

import { Mute } from '../icons/mute.icon';
import { Delete } from '../icons/delete.icon';
import { IChat } from "@/store/counter/chatSLice";
import { DoubleCheckmark } from "../icons/doubleCheckmark.icon";

import css from './Chat.module.css';
import { User } from "@/store/counter/userSlice";
import { MuteChat } from "../icons/muteChat.icon";

i18n.init({
  resources,
  lng: "en"
});

interface Data {
  data: IChat;
  chatId: number;
  theme: boolean;
  id: number | null;
}

export const Chat = ({
  id,
  data,
  theme,
  chatId
}: Data): JSX.Element => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDoubleClicked(true);
  };

  const userId: number | undefined = data.users_id.find((user_id) => user_id !== id);

  const router = useRouter();

  const time: Date = new Date(data.timeMessage);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const posts: Post[] = useSelector((state: State) => state.posts);
  const filteredPost: Post | undefined = posts.find((post) => post.id === data.postId);

  const user: User = useSelector((state: State) => state.user);
  const checkMute = user?.user?.mute_users.find((use) => use === data.userId);

  return (
    <div>
      <div className={css.chatWrapper}>
        <button
          className={css.chat}
          onContextMenu={handleDoubleClick}
          onClick={() => {
            if (!isDoubleClicked) {
              router.push(`/chats/chat_with_user/${userId}`);
            }
          }}
        >
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
              <Image
                alt='Avatar'
                src={data.link_avatar}
                className={css.avatar}
              />
            )}
          <div className={css.wrapper}>
            <div className={css.data}>
              <div className={theme ? css.darkName : css.name}>
                {data.name}
                {
                  checkMute && (<MuteChat />)
                }
              </div>
              <div className={theme ? css.darkMessage : css.message}>
                {!data.textMessage ? filteredPost?.title.slice(0, 20) + '...' : data.textMessage}
              </div>
            </div>
            <div className={css.timeWrapper}>
              <div className={css.wrap}>
                {
                  id === data.userId ? (data.isReadMessage ? <DoubleCheckmark color="#E3F563" /> : <DoubleCheckmark color="#AAAAAA" />) : null
                }
                <div className={theme ? css.darkTime : css.time}>
                  {`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}
                </div>
              </div>
              {
                id === data.userId || !data.userId ? null : (
                  <div className={css.newMessage}>
                    {data.unreadMessages}
                  </div>
                )
              }
            </div>
          </div>
        </button>
        {isDoubleClicked && (
          <>
            <button
              className={css.mute}
              onClick={() => setIsDoubleClicked(false)}
            >
              <Mute />
              <div className={css.muteText}>
                {i18n.t('mute')}
              </div>
            </button>
            <button
              className={css.delete}
              onClick={() => {
                setIsDoubleClicked(false);
                store.dispatch(deleteChat(chatId))
              }}
            >
              <Delete />
              <div className={css.deleteText}>
                {i18n.t('delete')}
              </div>
            </button>
          </>
        )}
      </div>
      <div className={theme ? css.darkLine : css.line} />
    </div>
  );
};
