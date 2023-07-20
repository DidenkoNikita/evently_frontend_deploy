'use client';

import Link from "next/link";

import { Logo } from "@/components/icons/logo.icon";

import css from './page.module.css';
import { useRouter } from "next/navigation";
import i18n from "i18next";
import resources from "@/locales/resource";
import { checkRememberMe } from "./checkRememberMe";
import { useEffect } from "react";

i18n.init({
  resources,
  lng: "en"
});

export default function Home(): JSX.Element {

  const router = useRouter();

  useEffect(() => {
    console.log('check remember me');
    
    checkRememberMe(router);
  })


  return (
    <div className={css.flexBox}>
      <Logo />
      <div className={css.title}>{i18n.t('evently')}</div>
      <div className={css.question}>{i18n.t('do_not_have_an_account')}</div>
      <button 
        className={css.button}
        onClick={() => router.push('/signup')}
      >
        {i18n.t('create_personal')}
      </button>
      <button 
        onClick={() => router.push('/signup_brand')}
        className={css.button}
      >
        {i18n.t('create_brand')}
      </button>
      <div className={css.stringСontainer}>
        <div className={css.question2}>{i18n.t('alredy_have_an_account')}</div>
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
