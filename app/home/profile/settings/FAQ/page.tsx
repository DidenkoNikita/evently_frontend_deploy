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
import { Footer } from "@/components/Footer/Footer";

import { ArrowToDown } from "@/components/icons/arrowToDown.icon";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface ArrFaq {
  key: number;
  title: string;
  text: string;
}

export default function faq(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const arrFaq: ArrFaq[] = [
    {
      key: 1,
      title: i18n.t('question1'),
      text: i18n.t('answer1')
    },
    {
      key: 2,
      title: i18n.t('question2'),
      text: i18n.t('answer2')
    },
    {
      key: 3,
      title: i18n.t('question3'),
      text: i18n.t('answer3')
    },
    {
      key: 4,
      title: i18n.t('question4'),
      text: i18n.t('answer4')
    },
    {
      key: 5,
      title: i18n.t('question5'),
      text: i18n.t('answer5')
    },
  ]

  const router = useRouter();

  const toggleActive = (index: number): void => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('faq')}
      />
      <div className={css.faq}>
        {arrFaq.map((faq, index) => (
          <button
            key={faq.key}
            onClick={() => toggleActive(index)}
            className={theme ? css.darkSelect : css.select}
          >
            <div className={css.titleWrapper}>
              <div className={css.title}>
                {faq.title}
              </div>
              <div className={index === activeIndex ? css.arrowActive : css.arrow}>
                <ArrowToDown />
              </div>
            </div>
            {index === activeIndex && (
              <div className={css.text}>
                {faq.text}
              </div>
            )}
          </button>
        ))}
        <button
          className={css.button}
          onClick={() => {
            router.push('/chats')
          }}
        >
          {i18n.t('support_chat')}
        </button>
      </div>
      <Footer />
    </div>
  )
}
