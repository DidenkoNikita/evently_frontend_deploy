'use client';

import { useEffect } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Arr {
  class: string;
  link: string;
  title: string;
}

export default function ServicesPage(): JSX.Element {
  useEffect((): void => {
    store.dispatch(userGet());
  }, []);

  const router = useRouter();

  const arr: Arr[] = [
    {
      class: 'dating',
      link: '/home/services/dating',
      title: i18n.t('dating')
    },
    {
      class: 'cafe',
      link: '/home/services/cafe',
      title: i18n.t('cafe')
    },
    {
      class: 'entertainment',
      link: '/home/services/entertainment',
      title: i18n.t('entertainment')
    },
    {
      class: 'leisure',
      link: '/home/services/leisure',
      title: i18n.t('leisure')
    }
  ]

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <Header />
      <div className={css.container}>
        <CalendarOfEventsHome />
      </div>
      <div className={css.buttonsWrapper}>
        {
          arr.map((element, index) => {
            return (
              <button
                key={index}
                className={css.button}
                onClick={() => {
                  router.push(element.link);
                }}
              >
                <div className={theme ? css.darkWrapperImage : css.wrapperImage}>
                  <div className={css[element.class]} />
                </div>
                <div className={theme ? css.darkTitle : css.title}>
                  {element.title}
                </div>
              </button>
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}