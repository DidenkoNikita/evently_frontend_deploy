'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Header } from "@/components/Header/Header";
import { userGet } from "@/store/actions/getUser";
import { store } from "@/store/store";
import { useEffect } from "react";

import css from './page.module.css';
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";
import { Footer } from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

export default function ServicesPage(): JSX.Element {
  useEffect(() => {
    store.dispatch(userGet());
  }, []);

  const router = useRouter();

  const arr = [
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

  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;

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
                <div className={theme? css.darkTitle : css.title}>
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