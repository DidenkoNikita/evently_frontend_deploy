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
import { userGet } from "@/store/actions/getUser";
import { getPost } from "@/store/actions/getPosts";
import { getChats } from "@/store/actions/getChats";
import { getUserList } from "@/store/actions/getUserList";

import { Chat } from "@/components/Chat/Chat";
import { Footer } from "@/components/Footer/Footer";
import { HeaderChats } from "@/components/HeaderChats/HeaderChats";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";

import css from './page.module.css'

i18n.init({
  resources,
  lng: "en"
});

export default function Chats(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [id, setId] = useState<number | null>(null);

  useEffect((): void => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId))
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });

    socket.on('createChat', (chatData) => {
      console.log("new chat created", chatData);
    });
    store.dispatch(getPost());
  }, []);

  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const chats: IChat[] = useSelector((state: State) => state.chats);
  const filteredChat: IChat[] = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sort: IChat[] = filteredChat.sort((a, b) => {
    const dateA = new Date(a.timeMessage).getTime();
    const dateB = new Date(b.timeMessage).getTime();
    return dateB - dateA;
  });

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderChats
        theme={theme}
        title={i18n.t('chats')}
      />
      <SearchComponent
        theme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className={css.chatsList}>
        {chats.length > 0 ? (
          filteredChat.length > 0 ? (
            sort.map((chat) => (
              <Chat
                theme={theme}
                key={chat.id}
                data={chat}
                id={id}
                chatId={chat.id}
              />
            ))
          ) : (
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('this_chat')}
            </div>
          )
        ) : (
          <div className={theme ? css.darkText : css.text}>
            {i18n.t('any_chats')}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

