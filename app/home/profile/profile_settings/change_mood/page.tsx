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
import { updateMood } from "@/store/actions/updateMood";

import { Footer } from "@/components/Footer/Footer";
import { Change } from "@/components/Change/Change";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function changeMood(): JSX.Element {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [userMood, setUserMood] = useState<{ [key: string]: boolean }>({});

  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const router = useRouter();

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

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

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderCategoriesOrMood
        theme={theme}
        title={i18n.t('change_your_mood')}
      />
      <Change
        theme={theme}
        words={mood}
        header=''
        color={false}
        user={userMood}
        setUser={setUserMood}
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
        setFilterCategory={null}
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