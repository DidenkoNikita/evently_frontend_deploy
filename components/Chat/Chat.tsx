'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Delete } from '../icons/delete.icon';
import { Mute } from '../icons/mute.icon';
import css from './Chat.module.css';
import { useState } from "react";
import { IChat } from "@/store/counter/chatSLice";
import { useRouter } from "next/navigation";
import { DoubleCheckmark } from "../icons/doubleCheckmark.icon";
import { store } from "@/store/store";
import { deleteChat } from "@/store/actions/deleteChat";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

interface Data {
  data: IChat;
  id: number | null;
  chatId: number;
  theme: boolean;
}

export const Chat = ({data, id, chatId, theme}: Data): JSX.Element => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleDoubleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDoubleClicked(true);
  };

  const userId = data.users_id.find((user_id) => user_id !== id);
  const router = useRouter();

  const time = new Date(data.timeMessage);
  
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const posts = useSelector((state: State) => state.posts);

  const filteredPost = posts.find((post) => post.id === data.postId)
  console.log('post', filteredPost);
  

  return (
    <div>
      <div className={css.chatWrapper}>
        <button 
          className={css.chat} 
          onClick={() => {
            if (!isDoubleClicked) {
              router.push(`/chats/chat_with_user/${userId}`);
            }
          }}
          onContextMenu={handleDoubleClick}
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
            <img 
              src={data.link_avatar} 
              alt='Avatar' 
              className={css.avatar} 
            />
          )}
          <div className={css.wrapper}>
            <div className={css.data}>
              <div className={theme ? css.darkName : css.name}>
                {data.name}
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
                id === data.userId || !data.userId ? null  : <div className={css.newMessage}>{data.unreadMessages}</div>
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
