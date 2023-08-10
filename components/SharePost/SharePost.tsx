'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

import css from './SharePost.module.css';
import { Share } from "../icons/share.icon";
import { Remove } from "../icons/remove.icon";
import { useEffect, useState } from "react";
import { Search } from "../icons/search.icon";
import { store } from "@/store/store";
import { getChats } from "@/store/actions/getChats";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { createMessage } from "@/store/actions/createMessage";
import { Data } from "@/app/home/page";

interface Props {
  setActiveModal: any;
  stateData: Data | null;
}

export const SharePost = ({ setActiveModal, stateData }: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [id, setId] = useState<number | undefined>(undefined);
  const [chatId, setChatId] = useState<number | null>(null);
  

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(userId));
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      // setLoading(false);
      store.dispatch(getChats(data));
    });
  }, [])

  const chats = useSelector((state: State) => state.chats);

  const filteredChat = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActiveButton = (index: number) => {
    if (activeButton.includes(index)) {
      setActiveButton(activeButton.filter(button => button !== index));
    } else {
      setActiveButton([index]);
    }
  }
  return (
    <div className={css.wrapper}>
      <dialog
        open
        className={css.modal}
      >
        <div className={css.header}>
          <button
            className={css.iconButton}
          >
            <Share />
          </button>
          <div className={css.title}>
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
        <div className={css.inputWrapper}>
          <Search />
          <input
            placeholder={i18n.t('search')}
            className={css.input}
            value={searchTerm}
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
                          <div className={css.avatarData}>
                            {chat.name.slice(0, 1)}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={chat.link_avatar}
                          alt='Avatar'
                          className={css.avatar}
                        />
                      )}
                    <div className={css.name}>
                      {chat.name}
                    </div>
                  </div>
                  <div className={css.buttonWrapper}>
                    <button
                      className={css.button}
                      onClick={() => {
                        handleActiveButton(index)
                        setChatId(chat.id);
                        setId(chat.users_id.find(i => i !== userId))
                      }}
                    >
                      {
                        activeButton.includes(index) ? <div className={css.curcle} /> : null
                      }
                    </button>
                  </div>
                </div>
                <div className={css.line} />
              </div>
            ))
          }
        </div>
        {
          activeButton.length > 0 && (
            <button 
              className={css.send}
              onClick={() => {
                store.dispatch(createMessage(Number(id), '', chatId, stateData));
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