'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './page.module.css';
import { ProfileHeader } from "@/components/ProfileHeader/ProfileHeader";
import { Footer } from "@/components/Footer/Footer";
import { Avatar } from "@/components/Avatar/Avatar";
import { UserData } from "@/components/UserData/UserData";
import { useSelector } from "react-redux";
import { State } from "@/components/Post/Post";
import { useEffect } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { LoadingComponent } from "@/components/Loading/Loading";

i18n.init({
  resources,
  lng: "en"
});

export default function profile(): JSX.Element {
  
  useEffect(() => {    
    store.dispatch(userGet());
  }, []);
  
  const user = useSelector((state : State) => state.user);  

  console.log('aaaaaaaaa',user.user);
  

  if (user.user === undefined) {
    return (
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    )
  }

  
  return (
    <div className={css.wrapper}>
      <ProfileHeader />
        <div className={css.scrollArea}>
          <Avatar user={user?.user}/>
          <UserData userData={user}/>
        </div>
      <Footer />
    </div>
  )
}