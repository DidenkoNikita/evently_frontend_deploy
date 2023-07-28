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
  }, [])

  return (
    <div className={css.wrapper}>
      <SettingsHeader 
        title={i18n.t('settings')} 
        link="/home/profile"
      />
      <div className={css.area}>
        <div className={css.wrapperSetting}>
          <div className={css.title}>
            {i18n.t('themes')}
          </div>
          <div className={css.buttonsArea}>
            <button
              onClick={() => setStateTheme(!stateTheme)}
              className={!stateTheme ? css.activeButton : css.button}
            >
              {i18n.t('light')}
            </button>
            <button
              onClick={() => setStateTheme(!stateTheme)}
              className={stateTheme ? css.activeButton : css.button}
            >
              {i18n.t('dark')}
            </button>
          </div>
        </div>
        <div className={css.wrapperSetting}>
          <div className={css.title}>
            {i18n.t('languages')}
          </div>
          <div className={css.buttonsArea}>
            <button
              onClick={() => setStateLanguage(!stateLanguage)}
              className={!stateLanguage ? css.activeButton : css.button}
            >
              {i18n.t('en')}
            </button>
            <button
              onClick={() => setStateLanguage(!stateLanguage)}
              className={stateLanguage ? css.activeButton : css.button}
            >
              {i18n.t('ru')}
            </button>
          </div>
        </div>
        <div className={css.notifications}>
          <div className={css.title}>
            {i18n.t('notifications')}
          </div>
          <div className={css.notificationsWrapper}>
            <div className={css.notification}>
              <div className={css.text}>
                {i18n.t('sound')}
              </div>
              <button 
                onClick={() => {setStateSound(!stateSound)}}
                className={stateSound ? css.activeCheckBox : css.checkbox}
              >
                <div className={css.curcle}/>
              </button>
            </div>
            <div className={css.line} />
            <div className={css.notification}>
              <div className={css.text}>
                {i18n.t('vibro')}
              </div>
              <button 
                onClick={() => {setStateVibro(!stateVibro)}}
                className={stateVibro ? css.activeCheckBox : css.checkbox}
              >
                <div className={css.curcle}/>
              </button>
            </div>
            <div className={css.line} />
            <div className={css.notification}>
              <div className={css.text}>
                {i18n.t('do_not_distrub')}
              </div>
              <button 
                onClick={() => {setStateDistrub(!stateDistrub)}}
                className={stateDistrub ? css.activeCheckBox : css.checkbox}
              >
                <div className={css.curcle}/>
              </button>
            </div>
          </div>
        </div>
        <div className={css.locationWrapper}>
          <div className={css.title}>
            {i18n.t('location')}
          </div>
          <div className={css.wrap}>
            <div className={css.setWrap}>
              <div className={css.titleWrap}>
                <City color="#BB83FF" />
                <div className={css.share}>
                  {i18n.t('share')}
                </div>
              </div>
              <button 
                onClick={() => {setStateLocation(!stateLocation)}}
                className={stateLocation ? css.activeCheckBox : css.checkbox}
              >
                <div className={css.curcle}/>
              </button>
            </div>
            <div className={css.wrapSet}>
              <div className={css.titleWrap}>
                <Privacy />
                <div className={css.text}>
                  {i18n.t('privacy')}
                </div>
              </div>
              <button className={css.iconButton}>
                <RightIcon />
              </button>
            </div>
            <div className={css.wrapSet}>
              <div className={css.titleWrap}>
                <Faq />
                <div className={css.text}>
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