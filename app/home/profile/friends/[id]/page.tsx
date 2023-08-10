'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';
import { Search } from "@/components/icons/search.icon";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { getUserList } from "@/store/actions/getUserList";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { Friend } from "@/components/Friend/Friend";
import { socket } from "@/utils/socket";
import { getChats } from "@/store/actions/getChats";

i18n.init({
  resources,
  lng: "en"
});

export default function Friends(): JSX.Element {
  const [stateInput, setStateInput] = useState<string>('');
  const [idUser, setIdUser] = useState<string>('');

  console.log(idUser.length);
  
  useEffect(() => {
    setIdUser(location.pathname);
    store.dispatch(userGet());
    store.dispatch(getUserList());
  }, []);


  useEffect(() => {
    store.dispatch(getUserList());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    socket.emit('getChats', userId);
    socket.on('chatData', (data) => {
      store.dispatch(getChats(data));
    });
  }, []);

  const user = useSelector((state: State) => state.user);

  const userList = useSelector((state: State) => state.usersList);

  const filteredFriends = userList.filter((us) =>
    us.name.toLowerCase().includes(stateInput.toLowerCase())
  );

  const id: number = Number(idUser.slice(22));

  console.log(id);

  const friend = userList.find((us) => us.id === id);
  console.log(friend);

  return (
    <div className={css.wrapper}>
      <HeaderCategoriesOrMood title={i18n.t('friends')} />
      <div className={css.search}>
        <input
          className={css.input}
          placeholder={i18n.t('search2')}
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
        />
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <div className={css.wrapperFriends}>
        {
          id !== user?.user?.id ? (
            filteredFriends.map((element, index) => {
              const checkFriend = friend?.friends_id.find((i) => i === element.id);
              if (checkFriend) {
                return (
                  <Friend 
                    key={index}
                    data={element}
                  />
                )
              }
            })
          ) : (
            filteredFriends.map((element, index) => {
              const checkFriend = user?.user?.friends_id.find((i) => i === element.id);
              if (checkFriend) {
                return (
                  <Friend 
                    key={index}
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
