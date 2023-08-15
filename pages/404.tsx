'use client';

import Image from "next/image";

import i18n from "i18next";

import resources from "@/locales/resource";
import pageNotFound from '../public/pageNotFound.png';

import { ButtonGoToMainPage } from "@/components/ButtonGoToMainPage/ButtonGoToMainPage";

import css from './404.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Custom404(): JSX.Element {

  return (
    <div className={css.wrapper}>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          {i18n.t('sorry')}
        </div>
        <div className={css.title}>
          {i18n.t('page_not_found')}
        </div>
      </div>
      <Image
        src={pageNotFound}
        alt="Page not found"
        width={363}
        height={385}
      />
      <ButtonGoToMainPage />
    </div>
  )
}