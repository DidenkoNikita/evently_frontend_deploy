'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './page.module.css';
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { History } from "@/components/History/History";
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getPost } from "@/store/actions/getPosts";
import { getComment } from "@/store/actions/getComments";
import { userGet } from "@/store/actions/getUser";
import { useRouter } from "next/navigation";
import { PostComponent } from "@/components/PostComponent/PostComponent";
import { SharePost } from "@/components/SharePost/SharePost";

i18n.init({
  resources,
  lng: "en"
});

export interface Data {
  post_id: number;
  post_name: string;
  link_photo: string;
  text: string
}

export default function (): JSX.Element {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [stateData, setStateData] = useState<Data | null>(null);
  console.log('post', stateData);

  useEffect(() => {
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
      {
        activeModal && (
          <SharePost
            stateData={stateData}
            setActiveModal={setActiveModal}
          />
        )
      }
      <div className={css.wrapper}>
        <History />
        <CalendarOfEventsHome />
        <PostComponent
          setActiveModal={setActiveModal}
          setStateData={setStateData}
        />
      </div>
      <Footer />
    </div>
  )
}