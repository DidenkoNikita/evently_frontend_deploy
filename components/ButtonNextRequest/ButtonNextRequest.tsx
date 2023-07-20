'use client';

import css from './ButtonNextRequest.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { signup } from '@/requests/signup';
import { useRouter } from 'next/navigation';
import { signupWithRememberMe } from '@/requests/signupWithRememberMe';

i18n.init({
  resources,
  lng: "en"
});

interface Data {
  user: any;
  click: boolean;
}

export const ButtonNextRequest = ({user, click}: Data): JSX.Element => {
  const router = useRouter()
  return (
    <button
      onClick={() => {
        if (click) {
          console.log('remember me');
          signupWithRememberMe(user, router)
        } else {
          signup(user, router)
        }
      }}
      className={css.button}
    >
      {i18n.t('next')}
    </button>
  )
}