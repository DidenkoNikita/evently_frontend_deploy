'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";
import { checkRememberMe } from "./checkRememberMe";

import { Logo } from "@/components/icons/logo.icon";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Home(): JSX.Element {
  const [userTheme, setUserTheme] = useState('light');

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setUserTheme(e.matches ? 'dark' : 'light');
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);
    setUserTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    return () => darkModeMediaQuery.removeListener(handleDarkModeChange);
  }, [])

  useEffect((): void => {
    checkRememberMe(router);
  }, [])

  const router = useRouter();

  return (
    <div className={userTheme === 'dark' ? css.darkFlexBox : css.flexBox}>
      <Logo />
      <div className={userTheme === 'dark' ? css.darkTitle : css.title}>
        {i18n.t('evently')}
      </div>
      <div className={userTheme === 'dark' ? css.darkQuestion : css.question}>
        {i18n.t('do_not_have_an_account')}
      </div>
      <button
        className={css.button}
        onClick={() => router.push('/signup')}
      >
        {i18n.t('create_personal')}
      </button>
      <button
        className={css.button}
        onClick={() => router.push('/signup_brand')}
      >
        {i18n.t('create_brand')}
      </button>
      <div className={css.stringСontainer}>
        <div className={userTheme === 'dark' ? css.darkQuestion2 : css.question2}>
          {i18n.t('alredy_have_an_account')}
        </div>
        <Link
          href='/login'
          className={css.link}
        >
          {i18n.t('log_in')}
        </Link>
      </div>
    </div>
  )
}
