'use client';

import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './ButtonGoToMainPage.module.css';

i18n.init({
  resources,
  lng: "en"
});

export const ButtonGoToMainPage = (): JSX.Element => {
  const router = useRouter();
  return (
    <button
      className={css.button}
      onClick={() => router.push('/home')}
    >
      {i18n.t('go_to_main_page')}
    </button>
  )
}