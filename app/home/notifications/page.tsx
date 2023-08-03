'use client';

import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Acquaintance } from "@/components/icons/acquaintance.icon";
import { AddFriend } from "@/components/icons/addFirend.icon";
import { Notification } from "@/components/icons/notification.icon";

import css from './page.module.css';
import { useEffect, useState } from "react";
import { RequestForFriendship } from "@/components/RequestForFriendship/RequestForFriendship";
import { Footer } from "@/components/Footer/Footer";
import { notificationsGet } from "@/store/actions/notificationsGet";
import { store } from "@/store/store";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

const arrButtons = [
  {
    title: i18n.t('general'),
    icon: <Notification />
  },
  {
    title: i18n.t('dating'),
    icon: <Acquaintance />
  },
  {
    title: i18n.t('requests'),
    icon: <AddFriend />
  },
];

export default function NotificationsPage(): JSX.Element {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(2);

  useEffect(() => {
    store.dispatch(notificationsGet());
  }, [])

  const notifications = useSelector((state: State) => state.notifications);

  console.log('notifications', notifications);

  return (
    <div>
      <HeaderProfileFriend
        title={i18n.t('notifications')}
      />
      <div className={css.wrapper}>
        <div className={css.buttonWrapper}>
          {
            arrButtons.map((button, index) => {
              return (
                <button
                  key={index}
                  className={activeButtonIndex === index ? css.activeIconButton : css.iconButton}
                  onClick={() => setActiveButtonIndex(index)}
                >
                  <div className={css.icon}>
                    {button.icon}
                  </div>
                  <div className={css.titleButton}>
                    {button.title}
                  </div>
                </button>
              )
            })
          }
        </div>
        <div>
          {activeButtonIndex === 2 && notifications.length > 0 ? (
            <div className={css.notifications}>
              <div className={css.counter}>
                {`${notifications.length}${i18n.t('new_frind_requests')}`}
              </div>
              {notifications.map((notification, index) => (
                <RequestForFriendship key={index} notification={notification} />
              ))}
            </div>
          ) : activeButtonIndex === 0 ? (
            <div className={css.warning}>
              {i18n.t('general_notifications')}
            </div>
          ) : (
            <div className={css.warning}>
              {i18n.t('dating_notifications')}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
