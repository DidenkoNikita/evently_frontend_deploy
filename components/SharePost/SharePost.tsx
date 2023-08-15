'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import { socket } from "@/utils/socket";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { IChat } from "@/store/counter/chatSLice";
import { getChats } from "@/store/actions/getChats";
import { createMessage } from "@/store/actions/createMessage";

import { Remove } from "../icons/remove.icon";
import { Search } from "../icons/search.icon";

import css from './SharePost.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number | null;
}

export const SharePost = ({ setActiveModal, postId }: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [chatId, setChatId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [id, setId] = useState<number | undefined>(undefined);
  const [activeButton, setActiveButton] = useState<number[]>([]);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(userId));
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });
  }, [])

  const chats: IChat[] = useSelector((state: State) => state.chats);

  const filteredChat: IChat[] = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActiveButton = (index: number): void => {
    if (activeButton.includes(index)) {
      setActiveButton(activeButton.filter(button => button !== index));
    } else {
      setActiveButton([index]);
    }
  }

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={css.wrapper}>
      <dialog
        open
        className={theme ? css.darkModal : css.modal}
      >
        <div className={css.header}>
          <div className={css.fakeButton} />
          <div className={theme ? css.darkTitle : css.title}>
            {i18n.t('Share')}
          </div>
          <button
            className={css.iconButton}
            onClick={() => {
              setActiveModal(false)
            }}
          >
            <Remove />
          </button>
        </div>
        <div className={theme ? css.darkInputWrapper : css.inputWrapper}>
          <Search />
          <input
            value={searchTerm}
            placeholder={i18n.t('search')}
            className={theme ? css.darkInput : css.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          {
            filteredChat.map((chat, index) => (
              <div key={index}>
                <div className={css.chat}>
                  <div className={css.container}>
                    {
                      chat.link_avatar === null ? (
                        <div
                          className={css.fakeAvatar}
                        >
                          <div className={theme ? css.darkAvatarData : css.avatarData}>
                            {chat.name.slice(0, 1)}
                          </div>
                        </div>
                      ) : (
                        <img
                          alt='Avatar'
                          src={chat.link_avatar}
                          className={css.avatar}
                        />
                      )}
                    <div className={theme ? css.darkName : css.name}>
                      {chat.name}
                    </div>
                  </div>
                  <div className={css.buttonWrapper}>
                    <button
                      onClick={() => {
                        handleActiveButton(index)
                        setChatId(chat.id);
                        setId(chat.users_id.find(i => i !== userId))
                      }}
                      className={theme ? css.darkButton : css.button}
                    >
                      {
                        activeButton.includes(index) ? <div className={css.curcle} /> : null
                      }
                    </button>
                  </div>
                </div>
                <div className={theme ? css.darkLine : css.line} />
              </div>
            ))
          }
        </div>
        {
          activeButton.length > 0 && (
            <button
              className={css.send}
              onClick={() => {
                store.dispatch(createMessage(Number(id), '', chatId, postId));
                setActiveModal(false)
              }}
            >
              {i18n.t('send')}
            </button>
          )
        }
      </dialog>
    </div>
  )
}