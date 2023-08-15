'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";

import { HomeIcon } from "../icons/home.icon";
import { ClipsIcon } from "../icons/clips.icon";
import { ChatsIcon } from "../icons/chats.icon";
import { ProfileIcon } from "../icons/profile.icon";
import { ServicesIcon } from "../icons/services.icon";

import css from './Footer.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Arr {
  icon: JSX.Element;
  title: string;
  link: string;
}

export const Footer = (): JSX.Element => {
  const [pathName, setPathName] = useState<string>('');

  useEffect((): void => {
    if (typeof window !== 'undefined') {
      setPathName(window.location.pathname);
    }
  }, []);

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  const isButtonActive = (link: string): boolean => {
    if (pathName === link ||
      (pathName === '/home/profile/profile_settings' && link === '/home/profile') ||
      (pathName === '/home/profile/settings' && link === '/home/profile') ||
      (pathName === '/home/profile/subscriptions' && link === '/home/profile') ||
      (pathName === '/home/profile/profile_settings/change_photo' && link === '/home/profile') ||
      (pathName === '/home/profile/profile_settings/change_city' && link === '/home/profile') ||
      (pathName === '/home/profile/profile_settings/change_categories' && link === '/home/profile') ||
      (pathName === '/home/profile/profile_settings/change_mood' && link === '/home/profile') ||
      (pathName === '/home/profile/settings/FAQ' && link === '/home/profile') ||
      (pathName === '/home/profile/settings/privacy' && link === '/home/profile') ||
      (pathName === '/home/profile/settings/privacy/confidentiality/phone' && link === '/home/profile') ||
      (pathName === '/home/profile/settings/privacy/confidentiality/messages' && link === '/home/profile') ||
      (pathName === '/chats/write_a_message' && link === '/chats') ||
      (/^\/chats\/chat_settings\/\d+$/.test(pathName) && link === '/chats') ||
      (/^\/home\/profile\/friends\/profile_friend\/\d+$/.test(pathName) && link === '/home/profile') ||
      (/^\/home\/profile\/friends\/\d+$/.test(pathName) && link === '/home/profile') ||
      (pathName === '/home/notifications' && link === '/home') ||
      (pathName === '/home/filter' && link === '/home') ||
      (pathName === '/home/services' && link === '/home/services') ||
      (pathName === '/home/services/cafe' && link === '/home/services') ||
      (pathName === '/home/services/entertainment' && link === '/home/services') ||
      (pathName === '/home/services/leisure' && link === '/home/services') ||
      (/^\/home\/services\/cafe\/\d+$/.test(pathName) && link === '/home/services') ||
      (/^\/home\/services\/entertainment\/\d+$/.test(pathName) && link === '/home/services') ||
      (/^\/home\/services\/leisure\/\d+$/.test(pathName) && link === '/home/services') ||
      (/^\/home\/services\/event\/\d+$/.test(pathName) && link === '/home/services') ||
      (/^\/home\/services\/event\/guests\/\d+$/.test(pathName) && link === '/home/services') ||
      (/^\/home\/post\/\d+$/.test(pathName) && link === '/home')) {
      return true;
    }

    return false;
  }

  const navigateButtons: Arr[] = [
    {
      icon: <HomeIcon color={isButtonActive('/home') ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />,
      title: i18n.t('home'),
      link: '/home'
    },
    {
      icon: <ServicesIcon color={isButtonActive('/home/services') ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />,
      title: i18n.t('services'),
      link: '/home/services'
    },
    {
      icon: <ClipsIcon color={isButtonActive('/home/clips') ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />,
      title: i18n.t('clips'),
      link: '/home/clips'
    },
    {
      icon: <ChatsIcon color={isButtonActive('/chats') ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />,
      title: i18n.t('chats'),
      link: '/chats'
    },
    {
      icon: <ProfileIcon color={isButtonActive('/home/profile') ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />,
      title: i18n.t('profile'),
      link: '/home/profile'
    },
  ];


  const router = useRouter();
  return (
    <footer className={theme ? css.darkFooter : css.footer}>
      {
        navigateButtons.map((navigateButton, index) => {
          return (
            <button
              key={index}
              className={
                pathName === navigateButton.link ||
                  (pathName === '/home/profile/profile_settings' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/settings' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/subscriptions' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/profile_settings/change_photo' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/profile_settings/change_city' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/profile_settings/change_categories' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/profile_settings/change_mood' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/settings/FAQ' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/settings/privacy' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/settings/privacy/confidentiality/phone' && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/profile/settings/privacy/confidentiality/messages' && navigateButton.link === '/home/profile') ||
                  (pathName === '/chats/write_a_message' && navigateButton.link === '/chats') ||
                  (/^\/chats\/chat_settings\/\d+$/.test(pathName) && navigateButton.link === '/chats') ||
                  (/^\/home\/profile\/friends\/profile_friend\/\d+$/.test(pathName) && navigateButton.link === '/home/profile') ||
                  (/^\/home\/profile\/friends\/\d+$/.test(pathName) && navigateButton.link === '/home/profile') ||
                  (pathName === '/home/notifications' && navigateButton.link === '/home') ||
                  (pathName === '/home/filter' && navigateButton.link === '/home') ||
                  (pathName === '/home/services' && navigateButton.link === '/home/services') ||
                  (pathName === '/home/services/cafe' && navigateButton.link === '/home/services') ||
                  (pathName === '/home/services/entertainment' && navigateButton.link === '/home/services') ||
                  (pathName === '/home/services/leisure' && navigateButton.link === '/home/services') ||
                  (/^\/home\/services\/cafe\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                  (/^\/home\/services\/entertainment\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                  (/^\/home\/services\/leisure\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                  (/^\/home\/services\/event\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                  (/^\/home\/post\/\d+$/.test(pathName) && navigateButton.link === '/home') ||
                  (/^\/home\/services\/event\/guests\/\d+$/.test(pathName) && navigateButton.link === '/home/services')
                  ? css.activeNavigateButton : (theme ? css.darkNavigateButton : css.navigateButton)
              }
              onClick={() => {
                if (navigateButton.link === '') {
                  router.push('/404')
                } else {
                  router.push(navigateButton.link);
                }
              }}
            >
              {navigateButton.icon}
              {navigateButton.title}
            </button>
          )
        })
      }

    </footer>
  )
}