'use client';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css'
import { useRouter } from "next/navigation";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { ArrowToDown } from "@/components/icons/arrowToDown.icon";
import { useState } from "react";

i18n.init({
  resources,
  lng: "en"
});

export default function faq(): JSX.Element {

  const arrFaq = [
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleActive = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Сбросить активный класс при повторном нажатии на одну и ту же кнопку
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={css.wrapper}>
      <SettingsHeader link="/home/profile/settings" title={i18n.t('faq')} />
      <div className={css.faq}>
        {arrFaq.map((faq, index) => {
          return (
            <button 
              key={faq.key}
              onClick={() => toggleActive(index)}
              className={css.select}
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
          );
        })}
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
  );
}
