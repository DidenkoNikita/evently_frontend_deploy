'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { HeaderChats } from "@/components/HeaderChats/HeaderChats";

import css from './page.module.css'
import { Search } from "@/components/icons/search.icon";
import { Chat } from "@/components/Chat/Chat";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { getChats } from "@/store/actions/getChats";
import { IChat } from "@/store/counter/chatSLice";

i18n.init({
  resources,
  lng: "en"
});

export default function Chats(): JSX.Element {
  const [chatsData, setChatsData] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId))
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      console.log("данные полученные с сервера", data);
      setLoading(false);
      store.dispatch(getChats(data));
    });

    socket.on('createChat', (chatData) => {
      console.log("новый чат создан", chatData);
      // setChatsData(prevChatsData => [...prevChatsData, chatData]);
    });

  }, []);

  const chats = useSelector((state: State) => state.chats);
  console.log('slsll', chats);

  return (
    <div className={css.wrapper}>
      <HeaderChats 
        link="/chats/write_a_message"
        title={i18n.t('chats')} 
      />
      <div className={css.search}>
        <div className={css.title}>
          {i18n.t('search2')}
        </div>
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <div className={css.chatsList}>
        {loading ? (
          <div>Loading...</div>
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <Chat 
              key={chat.id} 
              data={chat}
              id={id}
              chatId={chat.id}
            />
          ))
        ) : (
          <div className={css.text}>You don't have any chats yet...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

