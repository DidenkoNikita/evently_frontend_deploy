'use client';

import { useState } from "react";

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { Change } from "@/components/Change/Change";
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";

import css from './ChooseCategories.module.css'

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  activeCategories: boolean;
  userCategories: { [key: string]: boolean };
  setFilterCategory: React.Dispatch<React.SetStateAction<any>>;
  setUserCategories: React.Dispatch<React.SetStateAction<any>>;
  setActiveCategories: React.Dispatch<React.SetStateAction<any>>;
}

export const ChooseCategories = ({ 
  theme,
  userCategories, 
  activeCategories, 
  setUserCategories, 
  setFilterCategory, 
  setActiveCategories, 
}: Props): JSX.Element => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const categories: string[] = [
    i18n.t('restaurants'),
    i18n.t('trade_fairs'),
    i18n.t('lectures'),
    i18n.t('cafe'),
    i18n.t('bars'),
    i18n.t('sport'),
    i18n.t('dancing'),
    i18n.t('games'),
    i18n.t('quests'),
    i18n.t('concerts'),
    i18n.t('parties'),
    i18n.t('show'),
    i18n.t('for_free'),
    i18n.t('cinema'),
    i18n.t('theater')
  ];

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderFilter
        filterBrands={[]}
        title={i18n.t('categories')}
        setStateFilter={setActiveCategories}
      />
      <Change
        header=""
        color={true}
        theme={theme}
        words={categories}
        user={userCategories}
        setUser={setUserCategories}
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
        setFilterCategory={setFilterCategory}
      />
      {
        Object.keys(userCategories).length === 0 ? (
          <button className={css.button}>
            {i18n.t('ok')}
          </button>
        ) : (
          <button
            onClick={() => {
              setActiveCategories(!activeCategories);
            }}
            className={css.button}
          >
            {i18n.t('ok')}
          </button>
        )
      }
      <Footer />
    </div>
  );
}
