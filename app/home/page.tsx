'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getPost } from "@/store/actions/getPosts";
import { getComment } from "@/store/actions/getComments";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { History } from "@/components/History/History";
import { SharePost } from "@/components/SharePost/SharePost";
import { PostComponent } from "@/components/PostComponent/PostComponent";
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";

import css from './page.module.css';

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
  const [postId, setPostId] = useState<number | null>(null);  
 
  useEffect((): void => {
    store.dispatch(getPost());
    store.dispatch(userGet());
    store.dispatch(getComment());
  }, [])

  const router = useRouter();

  useEffect((): void => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
  }, [])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  
  return (
    <div className={theme ? css.darkHome : css.home}>
      <Header />
      {
        activeModal && (
          <SharePost
            postId={postId}
            setActiveModal={setActiveModal}
          />
        )
      }
      <div className={css.wrapper}>
        <History
          theme={theme}
        />
        <CalendarOfEventsHome />
        <PostComponent
          setActiveModal={setActiveModal}
          setPostId={setPostId}
        />
      </div>
      <Footer />
    </div>
  )
}