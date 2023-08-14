'use client';

import i18n from "i18next";

import resources from "@/locales/resource";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { Footer } from "@/components/Footer/Footer";

import css from './page.module.css'
import { City } from "@/components/icons/city.icon";
import { Privacy } from "@/components/icons/privacy.icon";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { Faq } from "@/components/icons/faq.icon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { store } from "@/store/store";
import { changeColorTheme } from "@/store/actions/changeColorTheme";
import { userGet } from "@/store/actions/getUser";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

export default function settings(): JSX.Element {
  const [stateTheme, setStateTheme] = useState<boolean>(false);
  const [stateLanguage, setStateLanguage] = useState<boolean>(false);
  const [stateSound, setStateSound] = useState<boolean>(false);
  const [stateVibro, setStateVibro] = useState<boolean>(false);
  const [stateDistrub, setStateDistrub] = useState<boolean>(false);
  const [stateLocation, setStateLocation] = useState<boolean>(false);

  const router = useRouter()

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      router.push('/');
    }
    store.dispatch(userGet());
  }, [])

  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;
  
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
              onClick={() => {
                setStateTheme(!stateTheme);
                store.dispatch(changeColorTheme(false));
              }}
              className={!theme ? css.activeButton : (theme ? css.darkButton : css.button)}
            >
              {i18n.t('light')}
            </button>
            <button
              onClick={() => {
                setStateTheme(!stateTheme);
                store.dispatch(changeColorTheme(true));
              }}
              className={theme ? css.activeButton : (theme ? css.darkButton : css.button)}
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
              onClick={() => setStateLanguage(!stateLanguage)}
              className={!stateLanguage ? css.activeButton : (theme ? css.darkButton : css.button)}
            >
              {i18n.t('en')}
            </button>
            <button
              onClick={() => setStateLanguage(!stateLanguage)}
              className={stateLanguage ? css.activeButton : (theme ? css.darkButton : css.button)}
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
                onClick={() => {setStateSound(!stateSound)}}
                className={stateSound ? css.activeCheckBox : (theme ? css.darkCheckBox : css.checkbox)}
              >
                <div className={css.curcle}/>
              </button>
            </div>
            <div className={theme ? css.darkLine : css.line} />
            <div className={css.notification}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('vibro')}
              </div>
              <button 
                onClick={() => {setStateVibro(!stateVibro)}}
                className={stateVibro ? css.activeCheckBox : (theme ? css.darkCheckBox : css.checkbox)}
              >
                <div className={css.curcle}/>
              </button>
            </div>
            <div className={theme ? css.darkLine : css.line} />
            <div className={css.notification}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('do_not_distrub')}
              </div>
              <button 
                onClick={() => {setStateDistrub(!stateDistrub)}}
                className={stateDistrub ? css.activeCheckBox : (theme ? css.darkCheckBox : css.checkbox)}
              >
                <div className={css.curcle}/>
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
                onClick={() => {setStateLocation(!stateLocation)}}
                className={stateLocation ? css.activeCheckBox : (theme ? css.darkCheckBox : css.checkbox)}
              >
                <div className={css.curcle}/>
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
                onClick={() => router.push('/home/profile/settings/FAQ')}
                className={css.iconButton}
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