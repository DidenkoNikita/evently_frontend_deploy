'use client';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './ChooseCategories.module.css'
import { useState } from "react";
import { Change } from "@/components/Change/Change";
import { useRouter } from "next/navigation";
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  userCategories: { [key: string]: boolean };
  setUserCategories: any;
  activeCategories: boolean;
  setActiveCategories: any;
  setFilterCategory: any;
}

export const ChooseCategories = ({userCategories, setUserCategories, activeCategories, setActiveCategories, setFilterCategory}: Props): JSX.Element => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const router = useRouter();

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
    <div className={css.wrapper}>
      <HeaderFilter
        title={i18n.t('categories')}
        filterBrands={[]}
        setStateFilter={setActiveCategories}
      />
      <Change
        words={categories}
        header=""
        color={true}
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
