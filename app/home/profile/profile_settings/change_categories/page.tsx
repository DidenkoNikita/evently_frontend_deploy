'use client';

import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css'
import { useState } from "react";
import { Change } from "@/components/Change/Change";
import { store } from "@/store/store";
import { updateCategories } from "@/store/actions/updateCategories";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en"
});

export default function changeCategories(): JSX.Element {
  const [userCategories, setUserCategories] = useState<{ [key: string]: boolean }>({});
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
      <HeaderCategoriesOrMood title={i18n.t('change_categories')} />
      <Change 
        words={categories}
        header=""  
        color={false}
        user={userCategories}
        setUser={setUserCategories}
        activeButtons={activeButtons}
        setActiveButtons={setActiveButtons}
        setFilterCategory={null}
      />
      {
        Object.keys(userCategories).length === 0 ? (
          <button className={css.button}>
            {i18n.t('save')}
          </button>  
        ) : (
          <button 
            onClick={() => {
              store.dispatch(updateCategories(userCategories));
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
  );
}
