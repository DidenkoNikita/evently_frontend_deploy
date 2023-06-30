'use client';
import { useRouter } from "next/navigation";

import { Back } from "@/components/icons/back.icon";

import LoginForm from "@/components/LoginForm/LoginForm";

import css from "./page.module.css";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          "log_in": "Log in",
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

export default function Login(): JSX.Element {
  const router = useRouter();
  const {t} = useTranslation();
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <button 
          className={css.buttonBack}
          onClick={() => router.back()}
        >
          <Back />
        </button>
        <div className={css.title}>{t('log_in')}</div>
      </div>
      <LoginForm />
    </div>
  )
}