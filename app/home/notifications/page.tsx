'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { notificationsGet } from "@/store/actions/notificationsGet";

import { Footer } from "@/components/Footer/Footer";
import { AddFriend } from "@/components/icons/addFirend.icon";
import { Acquaintance } from "@/components/icons/acquaintance.icon";
import { Notification } from "@/components/icons/notification.icon";
import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";
import { RequestForFriendship } from "@/components/RequestForFriendship/RequestForFriendship";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface ArrButtons {
  title: string;
  icon: JSX.Element;
}

export default function NotificationsPage(): JSX.Element {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(2);

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(notificationsGet());
  }, [])

  const notifications = useSelector((state: State) => state.notifications);
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  const arrButtons: ArrButtons[] = [
    {
      title: i18n.t('general'),
      icon: <Notification color={activeButtonIndex === 0 ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />
    },
    {
      title: i18n.t('dating'),
      icon: <Acquaintance color={activeButtonIndex === 1 ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />
    },
    {
      title: i18n.t('requests'),
      icon: <AddFriend color={activeButtonIndex === 2 ? '#000000' : (theme ? '#FFFFFF' : '#000000')} />
    },
  ];

  return (
    <div className={theme ? css.darkContainer : css.container}>
      <HeaderProfileFriend
        theme={theme}
        title={i18n.t('notifications')}
      />
      <div className={css.wrapper}>
        <div className={css.buttonWrapper}>
          {
            arrButtons.map((button, index) => (
              <button
                key={index}
                className={
                  activeButtonIndex === index ?
                    css.activeIconButton : (
                      theme ? css.darkIconButton : css.iconButton
                    )
                }
                onClick={() => {
                  setActiveButtonIndex(index);
                }}
              >
                <div className={css.icon}>
                  {button.icon}
                </div>
                <div
                  className={
                    activeButtonIndex === index ?
                      css.titleButton : (
                        theme ? css.darkTitleButton : css.titleButton
                      )
                  }
                >
                  {button.title}
                </div>
              </button>
            ))
          }
        </div>
        <div>
          {activeButtonIndex === 2 && notifications.length > 0 ? (
            <div className={css.notifications}>
              <div className={theme ? css.darkCounter : css.counter}>
                {`${notifications.length}${i18n.t('new_frind_requests')}`}
              </div>
              {notifications.map((notification, index) => (
                <RequestForFriendship
                  key={index}
                  theme={theme}
                  notification={notification}
                />
              ))}
            </div>
          ) : activeButtonIndex === 0 ? (
            <div className={theme ? css.darkWarning : css.warning}>
              {i18n.t('general_notifications')}
            </div>
          ) : (
            <div className={theme ? css.darkWarning : css.warning}>
              {i18n.t('dating_notifications')}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
