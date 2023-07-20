'use client';

import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css';
import { useState } from "react";
import { Change } from "@/components/Change/Change";
import { store } from "@/store/store";
import { updateCity } from "@/store/actions/updateCity";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en"
});

export default function changeCity(): JSX.Element {
  const [userCity, setUserCity] = useState<string>('');

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
  
  return (
    <div className={css.wrapper}>
      <SettingsHeader 
        title={i18n.t('change_city')} 
        link="/home/profile/profile_settings" 
      />
      <Change
        words={city}
        header={headerCity}
        user={userCity}
        setUser={setUserCity}
        activeButtons={activeButtonsCity}
        setActiveButtons={setActiveButtonsCity}
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