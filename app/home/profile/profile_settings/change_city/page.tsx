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
import { updateCity } from "@/store/actions/updateCity";

import { Footer } from "@/components/Footer/Footer";
import { Change } from "@/components/Change/Change";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function changeCity(): JSX.Element {
  const [userCity, setUserCity] = useState<string>('');
  const [activeButtonsCity, setActiveButtonsCity] = useState<string[]>([]);

  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const router = useRouter();

  const city: string[] = [
    i18n.t('saint_petersburg'),
    i18n.t('moscow'),
    i18n.t('kazan'),
    i18n.t('kemerovo'),
    i18n.t('barnaul'),
    i18n.t('arkhangelsk'),
    i18n.t('astrakhan'),
    i18n.t('rostov_on_don'),
    i18n.t('belgorod')
  ]

  const headerCity: string = i18n.t('choose_a_sity');
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('change_city')}
      />
      <Change
        theme={theme}
        words={city}
        color={false}
        header={headerCity}
        user={userCity}
        setUser={setUserCity}
        activeButtons={activeButtonsCity}
        setActiveButtons={setActiveButtonsCity}
        setFilterCategory={null}
      />
      {
        userCity.length === 0 ? (
          <button className={css.button}>
            {i18n.t('save')}
          </button>
        ) : (
          <button
            onClick={() => {
              store.dispatch(updateCity(userCity));
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