'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";

import { Avatar } from "@/components/Avatar/Avatar";
import { Footer } from "@/components/Footer/Footer";
import { FriendData } from "@/components/FriendData/FriendData";
import { LoadingComponent } from "@/components/Loading/Loading";
import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function ProfileFriend (): JSX.Element {
  const [userId, setUserId] = useState<string>('');  

  useEffect((): void => {
    store.dispatch(userGet());
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, [])

  const id: number = Number(userId.slice(37));
  const userList: UsersList[] = useSelector((state: State) => state.usersList);  
  const user: UsersList | undefined = userList.find((u) => u.id === id);
  const userData: User = useSelector((state: State) => state.user);
  const theme: boolean = userData?.user?.color_theme;

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