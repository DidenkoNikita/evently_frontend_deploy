'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';
import { Search } from "@/components/icons/search.icon";

i18n.init({
  resources,
  lng: "en"
});

export default function Friends(): JSX.Element {
  return (
    <div className={css.wrapper}>
      <HeaderCategoriesOrMood title={i18n.t('friends')} />
      <div className={css.search}>
        <div className={css.title}>
          {i18n.t('search2')}
        </div>
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <Footer />
    </div>
  )
}