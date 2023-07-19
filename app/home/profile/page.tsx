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
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";

i18n.init({
  resources,
  lng: "en"
});

export default function profile(): JSX.Element {
  
  
  useEffect(() => {
    console.log('idsiiss');
    
    store.dispatch(userGet())
  }, [])
  
  const user = useSelector((state : State) => state.user);

  console.log(user);
  
  const userData = user[0]

  if (userData === undefined) {
    return <div>Loading...</div>;
  }

  
  return (
    <div className={css.wrapper}>
      <ProfileHeader />
        <div className={css.scrollArea}>
          <Avatar user={userData.user}/>
          <UserData userData={userData}/>
        </div>
      <Footer />
    </div>
  )
}