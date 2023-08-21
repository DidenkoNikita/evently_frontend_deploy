'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { changeColorTheme } from "@/store/actions/changeColorTheme";

import { Faq } from "@/components/icons/faq.icon";
import { City } from "@/components/icons/city.icon";
import { Footer } from "@/components/Footer/Footer";
import { Privacy } from "@/components/icons/privacy.icon";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Settings(): JSX.Element {
  const [stateTheme, setStateTheme] = useState<boolean>(false);
  const [stateSound, setStateSound] = useState<boolean>(false);
  const [stateVibro, setStateVibro] = useState<boolean>(false);
  const [stateDistrub, setStateDistrub] = useState<boolean>(false);
  const [stateLanguage, setStateLanguage] = useState<boolean>(false);
  const [stateLocation, setStateLocation] = useState<boolean>(false);

  const router = useRouter()

  useEffect((): void => {
    store.dispatch(userGet());
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
  }, [router])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('settings')}
      />
      <div className={css.area}>
        <div className={css.wrapperSetting}>
          <div className={theme ? css.darkTitle : css.title}>
            {i18n.t('themes')}
          </div>
          <div className={css.buttonsArea}>
            <button
              className={
                !theme ? css.activeButton : (
                  theme ? css.darkButton : css.button
                )
              }
              onClick={() => {
                setStateTheme(!stateTheme);
                store.dispatch(changeColorTheme(false));
              }}
            >
              {i18n.t('light')}
            </button>
            <button
              className={
                theme ? css.activeButton : (
                  theme ? css.darkButton : css.button
                )
              }
              onClick={() => {
                setStateTheme(!stateTheme);
                store.dispatch(changeColorTheme(true));
              }}
            >
              {i18n.t('dark')}
            </button>
          </div>
        </div>
        <div className={css.wrapperSetting}>
          <div className={theme ? css.darkTitle : css.title}>
            {i18n.t('languages')}
          </div>
          <div className={css.buttonsArea}>
            <button
              className={
                !stateLanguage ? css.activeButton : (
                  theme ? css.darkButton : css.button
                )
              }
              onClick={() => {
                setStateLanguage(!stateLanguage)
              }}
            >
              {i18n.t('en')}
            </button>
            <button
              className={
                stateLanguage ? css.activeButton : (
                  theme ? css.darkButton : css.button
                )
              }
              onClick={() => setStateLanguage(!stateLanguage)}
            >
              {i18n.t('ru')}
            </button>
          </div>
        </div>
        <div className={css.notifications}>
          <div className={theme ? css.darkTitle : css.title}>
            {i18n.t('notifications')}
          </div>
          <div className={theme ? css.darkNotificationsWrapper : css.notificationsWrapper}>
            <div className={css.notification}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('sound')}
              </div>
              <button
                className={
                  stateSound ? css.activeCheckBox : (
                    theme ? css.darkCheckBox : css.checkbox
                  )
                }
                onClick={() => { setStateSound(!stateSound) }}
              >
                <div className={css.curcle} />
              </button>
            </div>
            <div className={theme ? css.darkLine : css.line} />
            <div className={css.notification}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('vibro')}
              </div>
              <button
                className={
                  stateVibro ? css.activeCheckBox : (
                    theme ? css.darkCheckBox : css.checkbox
                  )
                }
                onClick={() => { setStateVibro(!stateVibro) }}
              >
                <div className={css.curcle} />
              </button>
            </div>
            <div className={theme ? css.darkLine : css.line} />
            <div className={css.notification}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('do_not_distrub')}
              </div>
              <button
                className={
                  stateDistrub ? css.activeCheckBox : (
                    theme ? css.darkCheckBox : css.checkbox
                  )
                }
                onClick={() => { setStateDistrub(!stateDistrub) }}
              >
                <div className={css.curcle} />
              </button>
            </div>
          </div>
        </div>
        <div className={css.locationWrapper}>
          <div className={theme ? css.darkTitle : css.title}>
            {i18n.t('location')}
          </div>
          <div className={css.wrap}>
            <div className={theme ? css.darkSetWrap : css.setWrap}>
              <div className={css.titleWrap}>
                <City color="#BB83FF" />
                <div className={css.share}>
                  {i18n.t('share')}
                </div>
              </div>
              <button
                className={
                  stateLocation ? css.activeCheckBox : (
                    theme ? css.darkCheckBox : css.checkbox
                  )
                }
                onClick={() => { setStateLocation(!stateLocation) }}
              >
                <div className={css.curcle} />
              </button>
            </div>
            <div className={theme ? css.darkWrapSet : css.wrapSet}>
              <div className={css.titleWrap}>
                <Privacy />
                <div className={theme ? css.darkText : css.text}>
                  {i18n.t('privacy')}
                </div>
              </div>
              <button
                className={css.iconButton}
                onClick={() => {
                  router.push('/home/profile/settings/privacy')
                }}
              >
                <RightIcon />
              </button>
            </div>
            <div className={theme ? css.darkWrapSet : css.wrapSet}>
              <div className={css.titleWrap}>
                <Faq />
                <div className={theme ? css.darkText : css.text}>
                  {i18n.t('faq')}
                </div>
              </div>
              <button
                className={css.iconButton}
                onClick={() => router.push('/home/profile/settings/FAQ')}
              >
                <RightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}