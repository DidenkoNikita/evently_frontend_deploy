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
import { useEffect } from "react";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

export default function WriteMessage(): JSX.Element {
  useEffect(() => {store.dispatch(getUserList())});

  const usersList = useSelector((state : State) => state.usersList);
  
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <SettingsHeader
          title={i18n.t('write_message')}
          link="/chats"
        />
      </div>
      <div className={css.search}>
        <div className={css.title}>
          {i18n.t('search2')}
        </div>
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <div className={css.chatsList}>
        {
          usersList.map((user) => {
            return (
              <UserCreateChat
                key={user.id}
                id={user.id}
                name={user.name}
                linkAvatar={user.link_avatar}
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}