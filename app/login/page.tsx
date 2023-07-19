'use client';
import { useRouter } from "next/navigation";

import { Back } from "@/components/icons/back.icon";

import LoginForm from "@/components/LoginForm/LoginForm";

import css from "./page.module.css";

import i18n from "i18next";
import resources from "@/locales/resource";


i18n.init({
  resources,
  lng: "en"
});

export default function Login(): JSX.Element {
  const router = useRouter();

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <button 
          className={css.buttonBack}
          onClick={() => router.back()}
        >
          <Back />
        </button>
        <div className={css.title}>{i18n.t('log_in')}</div>
      </div>
      <LoginForm />
    </div>
  )
}