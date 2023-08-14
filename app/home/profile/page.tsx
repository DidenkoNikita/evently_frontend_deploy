'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './page.module.css';
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";
import { Footer } from "@/components/Footer/Footer";
import { Avatar } from "@/components/Avatar/Avatar";
import { UserData } from "@/components/UserData/UserData";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { LoadingComponent } from "@/components/Loading/Loading";
import { getSubscriptions } from "@/store/actions/getSubscription";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

export default function profile(): JSX.Element {
  
  useEffect(() => {    
    store.dispatch(userGet());
    store.dispatch(getSubscriptions());
  }, []);
  
  const user = useSelector((state: State) => state.user);    
  const theme = user?.user?.color_theme;  

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