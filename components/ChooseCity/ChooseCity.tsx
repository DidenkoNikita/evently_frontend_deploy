'use client';

import { useState } from "react";

import i18n from "i18next";

import resources from "@/locales/resource";

import { Change } from "../Change/Change";
import { Footer } from "../Footer/Footer";
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";

import css from './ChooseCity.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  userCity: string;
  activeCity: boolean;
  setUserCity: React.Dispatch<React.SetStateAction<string>>;
  setActiveCity: React.Dispatch<React.SetStateAction<any>>;
}

export const ChooseCity = ({ 
  theme, 
  userCity, 
  activeCity, 
  setUserCity, 
  setActiveCity, 
}: Props): JSX.Element => {
  const [activeButtonsCity, setActiveButtonsCity] = useState<string[]>([]);

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
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderFilter
        setStateFilter={setActiveCity}
        title={i18n.t('city')}
        filterBrands={[]}
      />
      <Change
        words={city}
        color={true}
        theme={theme}
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
            {i18n.t('ok')}
          </button>
        ) : (
          <button
            onClick={() => {
              setActiveCity(!activeCity)
            }}
            className={css.button}
          >
            {i18n.t('ok')}
          </button>
        )
      }
      <Footer />
    </div>
  )
}