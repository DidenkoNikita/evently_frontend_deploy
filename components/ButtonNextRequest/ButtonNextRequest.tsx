'use client';

import css from './ButtonNextRequest.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { signup } from '@/requests/signup';
import { useRouter } from 'next/navigation';

i18n.init({
  resources,
  lng: "en"
});

export const ButtonNextRequest = (user: any): JSX.Element => {
  const router = useRouter()
  return (
    <button
      onClick={() => {signup(user, router)}}
      className={css.button}
    >
      {i18n.t('next')}
    </button>
  )
}