'use client';

import { HomeIcon } from "../icons/home.icon";

import i18n from "i18next";

import resources from "@/locales/resource";
import { ServicesIcon } from "../icons/services.icon";
import { ClipsIcon } from "../icons/clips.icon";
import { ChatsIcon } from "../icons/chats.icon";
import { ProfileIcon } from "../icons/profile.icon";

import css from './Footer.module.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

i18n.init({
  resources,
  lng: "en"
});

export const Footer = (): JSX.Element => {
  const [pathName, setPathName] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathName(window.location.pathname);
    }
  }, []);
  
  const navigateButtons = [
    {
      icon: <HomeIcon />,
      title: i18n.t('home'),
      link: '/home'
    },
    {
      icon: <ServicesIcon />,
      title: i18n.t('services'),
      link: '/home/services'
    },
    {
      icon: <ClipsIcon />,
      title: i18n.t('clips'),
      link: '/home/clips'
    },
    {
      icon: <ChatsIcon />,
      title: i18n.t('chats'),
      link: '/chats'
    },
    {
      icon: <ProfileIcon />,
      title: i18n.t('profile'),
      link: '/home/profile'
    },
  ];

  const router = useRouter();
  return (
    <footer className={css.footer}>
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
                (/^\/home\/profile\/friends\/\d+$/.test(pathName)&& navigateButton.link === '/home/profile') ||
                (pathName === '/home/notifications' && navigateButton.link === '/home') ||
                (pathName === '/home/filter' && navigateButton.link === '/home') ||
                (pathName === '/home/services' && navigateButton.link === '/home/services') ||
                (pathName === '/home/services/cafe' && navigateButton.link === '/home/services') ||
                (pathName === '/home/services/entertainment' && navigateButton.link === '/home/services') ||
                (pathName === '/home/services/leisure' && navigateButton.link === '/home/services') ||
                (/^\/home\/services\/cafe\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                (/^\/home\/services\/entertainment\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                (/^\/home\/services\/leisure\/\d+$/.test(pathName) && navigateButton.link === '/home/services') ||
                (/^\/home\/services\/event\/\d+$/.test(pathName) && navigateButton.link === '/home/services')
                ? css.activeNavigateButton : css.navigateButton
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