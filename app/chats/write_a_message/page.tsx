'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import { socket } from "@/utils/socket";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getChats } from "@/store/actions/getChats";
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";

import { Footer } from "@/components/Footer/Footer";
import { UserCreateChat } from "@/components/UserCreateChat/UserCreateChat";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function WriteMessage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect((): void => {
    store.dispatch(getUserList());
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(user_id));
    store.dispatch(userGet());
  }, [])

  useEffect((): void => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });
  }, [])

  const usersList: UsersList[] = useSelector((state: State) => state.usersList);
  const filteredUsersList = usersList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.id !== userId
  );

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div className={css.header}>
        <SettingsHeader
          theme={theme}
          title={i18n.t('write_message')}
        />
      </div>
      <SearchComponent
        theme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className={css.chatsList}>
        {
          filteredUsersList.map((user) => {
            return (
              <UserCreateChat
                user={user}
                theme={theme}
                key={user.id}
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}