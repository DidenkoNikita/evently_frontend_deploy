'use client';

import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css';
import { useEffect, useState } from "react";
import { Change } from "@/components/Change/Change";
import { store } from "@/store/store";
import { updateCity } from "@/store/actions/updateCity";
import { useRouter } from "next/navigation";
import { userGet } from "@/store/actions/getUser";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

export default function changeCity(): JSX.Element {
  const [userCity, setUserCity] = useState<string>('');

  useEffect(() => {
    store.dispatch(userGet());
  }, [])

  const [activeButtonsCity, setActiveButtonsCity] = useState<string[]>([]);

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
  ];

  const headerCity: string = i18n.t('choose_a_sity');

  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;
  
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