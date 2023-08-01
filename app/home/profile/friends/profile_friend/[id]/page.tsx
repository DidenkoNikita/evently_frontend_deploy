'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css';
import { Avatar } from "@/components/Avatar/Avatar";
import { FriendData } from "@/components/FriendData/FriendData";

i18n.init({
  resources,
  lng: "en"
});

export default function ProfileFriend (): JSX.Element {
  const [userId, setUserId] = useState<string>('');

  console.log(userId.length);
  

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(37));

  const userList = useSelector((state: State) => state.usersList);

  console.log(userList);
  

  const user = userList.find((u) => u.id === id)
  console.log(user);
  
  return (
    <div>
      <HeaderProfileFriend 
        title={i18n.t('profile')}
      />
      <div className={css.scrollArea}>
        <Avatar 
          user={user}
        />
        <FriendData 
          userData={user}
          id={id}
        />
      </div>
      <Footer />
    </div>
  )
}