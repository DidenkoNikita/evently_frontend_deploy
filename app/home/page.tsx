'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './page.module.css';
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { History } from "@/components/History/History";
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";
import { Post } from "@/components/Post/Post";
import { useEffect } from "react";
import { store } from "@/store/store";
import { getPost } from "@/store/actions/getPosts";
import { getComment } from "@/store/actions/getComments";
import { userGet } from "@/store/actions/getUser";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en"
});

export default function(): JSX.Element {
  useEffect(() => {
    console.log('home');
    
    store.dispatch(getPost())
    store.dispatch(getComment())
    store.dispatch(userGet())
  }, [])

  const router = useRouter()

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
  }, [])

  return (
    <div className={css.home}>
      <Header />
      <div className={css.wrapper}>
        <History />
        <CalendarOfEventsHome />
        <Post />
      </div>
      <Footer />
    </div>
  )
}