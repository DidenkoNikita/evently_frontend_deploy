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
import { Friend } from "@/components/Friend/Friend";
import { getChats } from "@/store/actions/getChats";
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";

import { Footer } from "@/components/Footer/Footer";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Friends(): JSX.Element {
  const [idUser, setIdUser] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect((): void => {
    store.dispatch(userGet());
    setIdUser(location.pathname);
    store.dispatch(getUserList());
  }, [])

  useEffect((): void => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });
  }, [])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  const userList: UsersList[] = useSelector((state: State) => state.usersList);
  const filteredFriends: UsersList[] = userList.filter((us) =>
    us.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const id: number = Number(idUser.slice(22));
  const friend: UsersList | undefined = userList.find((us) => us.id === id);

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderCategoriesOrMood 
        theme={theme}
        title={i18n.t('friends')} 
      />
      <div className={css.search}>
        <SearchComponent
          theme={theme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className={css.wrapperFriends}>
        {
          id !== user?.user?.id ? (
            filteredFriends.map((element, index) => {
              const checkFriend: number | undefined = friend?.friends_id.find((i) => i === element.id);
              if (checkFriend) {
                return (
                  <Friend 
                    key={index}
                    theme={theme}
                    data={element}
                  />
                )
              }
            })
          ) : (
            filteredFriends.map((element, index) => {
              const checkFriend: number | undefined = user?.user?.friends_id.find((i) => i === element.id);
              if (checkFriend) {
                return (
                  <Friend 
                    key={index}
                    theme={theme}
                    data={element}
                  />
                )
              }
            })
          )
        }
      </div>
      <Footer />
    </div>
  );
}
