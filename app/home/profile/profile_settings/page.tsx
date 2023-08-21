'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";

import { Footer } from "@/components/Footer/Footer";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { LoadingComponent } from "@/components/Loading/Loading";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function ProfileSettings(): JSX.Element {
  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const router = useRouter();

  useEffect((): void => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
  }, [router])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  if (!user) {
    return <LoadingComponent />;
  }

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('edit_profile')}
      />
      <div className={css.settingsWrapper}>
        <div className={theme ? css.darkCard : css.card}>
          <div className={theme ? css.darkText : css.text}>
            {i18n.t('my_photo')}
          </div>
          <button
            className={css.button}
            onClick={() => {
              router.push('/home/profile/profile_settings/change_photo')
            }}
          >
            <RightIcon />
          </button>
        </div>
        <div className={theme ? css.darkCard : css.card}>
          <div className={theme ? css.darkText : css.text}>
            {i18n.t('personal_data')}
          </div>
          <button
            className={css.button}
            onClick={() => {
              router.push('/home/profile/profile_settings/personal_data')
            }}
          >
            <RightIcon />
          </button>
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={theme ? css.darkCard : css.card}>
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('change_number')}
            </div>
            <div className={css.data}>
              {user?.user?.phone}
            </div>
            <button
              className={css.button}
              onClick={() => {
                router.push('/home/profile/profile_settings/change_number');
              }}
            >
              <RightIcon />
            </button>
          </div>
          <div className={theme ? css.darkLine : css.line} />
          <div className={theme ? css.darkCard : css.card}>
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('change_email')}
            </div>
            <div className={css.data}>
              full.name@gmail.com
            </div>
            <button
              className={css.button}
              onClick={() => {
                router.push('/home/profile/profile_settings/change_email');
              }}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={theme ? css.darkCard : css.card}>
          <div className={theme ? css.darkText : css.text}>
            {i18n.t('change_city')}
          </div>
          <div className={css.data}>
            {user?.user?.city}
          </div>
          <button
            className={css.button}
            onClick={() => {
              router.push('/home/profile/profile_settings/change_city');
            }}
          >
            <RightIcon />
          </button>
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={theme ? css.darkCard : css.card}>
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('change_categories')}
            </div>
            <button
              className={css.button}
              onClick={() => {
                router.push('/home/profile/profile_settings/change_categories');
              }}
            >
              <RightIcon />
            </button>
          </div>
          <div className={theme ? css.darkLine : css.line} />
          <div className={theme ? css.darkCard : css.card}>
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('change_your_mood')}
            </div>
            <button
              className={css.button}
              onClick={() => {
                router.push('/home/profile/profile_settings/change_mood');
              }}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={theme ? css.darkCard : css.card}>
          <div className={theme ? css.darkText : css.text}>
            {i18n.t('change_password')}
          </div>
          <button
            className={css.button}
            onClick={() => {
              router.push('/home/profile/profile_settings/change_password');
            }}
          >
            <RightIcon />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}