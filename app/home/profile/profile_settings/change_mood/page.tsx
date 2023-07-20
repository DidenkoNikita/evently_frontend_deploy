'use client';

import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css';
import { Change } from "@/components/Change/Change";
import { useState } from "react";
import { store } from "@/store/store";
import { updateMood } from "@/store/actions/updateMood";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en"
});

export default function changeMood(): JSX.Element {
  const [userMood, setUserMood] = useState<{ [key: string]: boolean }>({});

  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const mood: string[] = [
    i18n.t('funny'),
    i18n.t('sad'),
    i18n.t('gambling'),
    i18n.t('romantic'),
    i18n.t('energetic'),
    i18n.t('festive'),
    i18n.t('calm'),
    i18n.t('friendly'),
    i18n.t('cognitive'),
    i18n.t('dreamy'),
    i18n.t('do_not_know')
  ];
  
  const router = useRouter();

  return (
    <div className={css.wrapper}>
      <HeaderCategoriesOrMood title={i18n.t('change_your_mood')} />
      <Change 
        words={mood}
        header=''
        user={userMood}
        setUser={setUserMood}
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
      />
      {
        Object.keys(userMood).length === 0 ? (
          <button className={css.button}>
            {i18n.t('save')}
          </button>  
        ) : (
          <button 
            onClick={() => {
              store.dispatch(updateMood(userMood));
              router.push('/home/profile/profile_settings');
            }}
            className={css.button}
          >
            {i18n.t('save')}
          </button>
        )
      }
      <Footer />
    </div>
  )
}