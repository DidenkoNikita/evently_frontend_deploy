'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { HeaderChats } from "@/components/HeaderChats/HeaderChats";

import css from './page.module.css'
import { Chat } from "@/components/Chat/Chat";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { getChats } from "@/store/actions/getChats";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";
import { getPost } from "@/store/actions/getPosts";
import { userGet } from "@/store/actions/getUser";

i18n.init({
  resources,
  lng: "en"
});

export default function Chats(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId))
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });

    socket.on('createChat', (chatData) => {
      console.log("новый чат создан", chatData);
    });
    store.dispatch(getPost());
  }, []);

  useEffect(() => {
    store.dispatch(userGet());
  }, [])

  const chats = useSelector((state: State) => state.chats);
  
  const filteredChat = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sort = filteredChat.sort((a, b) => {
    const dateA = new Date(a.timeMessage).getTime();
    const dateB = new Date(b.timeMessage).getTime();
    console.log(dateA > dateB);
    
    return dateB - dateA;
  });  

  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderChats 
        theme={theme}
        link="/home"
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

