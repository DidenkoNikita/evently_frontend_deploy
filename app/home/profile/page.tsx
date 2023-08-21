'use client';

import { useEffect } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getSubscriptions } from "@/store/actions/getSubscription";

import { Footer } from "@/components/Footer/Footer";
import { Avatar } from "@/components/Avatar/Avatar";
import { UserData } from "@/components/UserData/UserData";
import { LoadingComponent } from "@/components/Loading/Loading";
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Profile(): JSX.Element {
  useEffect((): void => {    
    store.dispatch(userGet());
    store.dispatch(getSubscriptions());
  }, [])
  
  const user: User = useSelector((state: State) => state.user);    
  const theme: boolean = user?.user?.color_theme;  

  if (user.user === undefined) {
    return (
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    )
  }

  return (
    <div className={css.wrapper}>
      <ProfileHeader theme={theme} />
        <div className={css.scrollArea}>
          <Avatar 
            theme={theme}
            user={user?.user}
          />
          <UserData 
            theme={theme}
            userData={user}
          />
        </div>
      <Footer />
    </div>
  )
}