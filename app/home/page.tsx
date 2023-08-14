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
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

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

  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;
  console.log(user);
  

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