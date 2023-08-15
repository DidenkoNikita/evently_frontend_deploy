'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";

import { Back } from "@/components/icons/back.icon";
import LoginForm from "@/components/LoginForm/LoginForm";

import css from "./page.module.css";

i18n.init({
  resources,
  lng: "en"
});

export default function Login(): JSX.Element {
  const [userTheme, setUserTheme] = useState<string>('light');
  
  const router = useRouter();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setUserTheme(e.matches ? 'dark' : 'light');
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);
    setUserTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    return () => darkModeMediaQuery.removeListener(handleDarkModeChange);
  }, []);

  return (
    <div className={userTheme === 'dark' ? css.darkWrapper : css.wrapper}>
      <div className={css.header}>
        <button 
          className={css.buttonBack}
          onClick={() => router.back()}
        >
          <Back color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={userTheme === 'dark' ? css.darkTitle : css.title}>
          {i18n.t('log_in')}
        </div>
      </div>
      <LoginForm 
        userTheme={userTheme}
      />
    </div>
  )
}