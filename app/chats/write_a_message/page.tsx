'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';
import { Search } from "@/components/icons/search.icon";
import { Footer } from "@/components/Footer/Footer";
import { UserCreateChat } from "@/components/UserCreateChat/UserCreateChat";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { getChats } from "@/store/actions/getChats";
import { socket } from "@/utils/socket";

export default function WriteMessage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    store.dispatch(getUserList());
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(user_id));
  }, []);

  useEffect(() => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });
  }, []);

  const usersList = useSelector((state : State) => state.usersList);

  const filteredUsersList = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    user.id !== userId
  );

  
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <SettingsHeader
          title={i18n.t('write_message')}
        />
      </div>
      <div className={css.search}>
        <input
          className={css.input}
          placeholder={i18n.t('search2')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <div className={css.chatsList}>
        {
          filteredUsersList.map((user) => {
            return (
              <UserCreateChat
                key={user.id}
                user={user}
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}