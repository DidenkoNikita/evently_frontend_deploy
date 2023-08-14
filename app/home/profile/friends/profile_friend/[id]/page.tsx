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
import { LoadingComponent } from "@/components/Loading/Loading";
import { userGet } from "@/store/actions/getUser";

i18n.init({
  resources,
  lng: "en"
});

export default function ProfileFriend (): JSX.Element {
  const [userId, setUserId] = useState<string>('');  

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
    store.dispatch(userGet());
  }, []);

  const id: number = Number(userId.slice(37));

  const userList = useSelector((state: State) => state.usersList);  

  const user = userList.find((u) => u.id === id);

  const userData = useSelector((state: State) => state.user);
  const theme = userData?.user?.color_theme;

  if (user === undefined) {
    return (
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    )
  }
  
  return (
    <div>
      <HeaderProfileFriend 
        theme={theme}
        title={i18n.t('profile')}
      />
      <div className={css.scrollArea}>
        <Avatar 
          theme={theme}
          user={user}
        />
        <FriendData 
          id={id}
          theme={theme}
          userData={user}
        />
      </div>
      <Footer />
    </div>
  )
}