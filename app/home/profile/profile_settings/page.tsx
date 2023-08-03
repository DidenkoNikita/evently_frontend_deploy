'use client';

import i18n from "i18next";

import resources from "@/locales/resource";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';
import { Footer } from "@/components/Footer/Footer";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { useEffect } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { useSelector } from "react-redux";
import { State } from "@/components/Post/Post";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "@/components/Loading/Loading";

i18n.init({
  resources,
  lng: "en"
});


export default function profileSettings(): JSX.Element {
  useEffect(() => {    
    store.dispatch(userGet())
  }, [])

  const user = useSelector((state : State) => state.user);

  const router = useRouter();

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
  }, [])
  
  if (!user) {
    return <LoadingComponent />;
  }
  return (
    <div className={css.wrapper}>
      <SettingsHeader title={i18n.t('edit_profile')} link="/home/profile" />
      <div className={css.settingsWrapper}>
        <div className={css.card}>
          <div
            className={css.text}
          >
            {i18n.t('my_photo')}
          </div>
          <button 
            onClick={() => {router.push('/home/profile/profile_settings/change_photo')}}
            className={css.button}
          >
            <RightIcon />
          </button>
        </div>
        <div className={css.card}>
          <div
            className={css.text}
          >
            {i18n.t('personal_data')}
          </div>
          <button 
            onClick={() => {router.push('/home/profile/profile_settings/personal_data')}}
            className={css.button}
          >
            <RightIcon />
          </button>
        </div>
        <div className={css.wrap}>
          <div className={css.card}>
            <div
              className={css.text}
            >
              {i18n.t('change_number')}
            </div>
            <div className={css.data}>
              {user?.user?.phone}
            </div>
            <button 
              onClick={() => {router.push('/home/profile/profile_settings/change_number')}}
              className={css.button}
            >
              <RightIcon />
            </button>
          </div>
          <div className={css.line}/>
          <div className={css.card}>
            <div
              className={css.text}
            >
              {i18n.t('change_email')}
            </div>
            <div className={css.data}>
              full.name@gmail.com
            </div>
            <button
              onClick={() => {router.push('/home/profile/profile_settings/change_email')}} 
              className={css.button}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={css.card}>
          <div
            className={css.text}
          >
            {i18n.t('change_city')}
          </div>
          <div className={css.data}>
            {user?.user?.city}
          </div>
          <button 
            onClick={() => {router.push('/home/profile/profile_settings/change_city')}}
            className={css.button}
          >
            <RightIcon />
          </button>
        </div>
        <div className={css.wrap}>
          <div className={css.card}>
            <div
              className={css.text}
            >
              {i18n.t('change_categories')}
            </div>
            <button 
              onClick={() => {router.push('/home/profile/profile_settings/change_categories')}}
              className={css.button}
            >
              <RightIcon />
            </button>
          </div>
          <div className={css.line}/>
          <div className={css.card}>
            <div
              className={css.text}
            >
              {i18n.t('change_your_mood')}
            </div>
            <button 
              className={css.button}
              onClick={() => {router.push('/home/profile/profile_settings/change_mood')}}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={css.card}>
          <div
            className={css.text}
          >{i18n.t('change_password')}</div>
          <button 
            className={css.button}
            onClick={() => {router.push('/home/profile/profile_settings/change_password')}}
          >
            <RightIcon />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}