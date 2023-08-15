import i18n from "i18next";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { Notification } from "@/store/counter/notificationSlice";
import { rejectNotification } from "@/store/actions/rejectNotification";
import { notificationConfirm } from "@/store/actions/notificationConfirm";

import css from './RequestForFriendship.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  notification: Notification;
}

export const RequestForFriendship = ({
  notification,
  theme
}: Props): JSX.Element => {
  return (
    <div className={css.wrapper}>
      <div className={css.wrapperData}>
        {
          notification.link_avatar === null ? (
            <div
              className={css.fakeAvatar}
            >
              <div className={theme ? css.darkAvatarData : css.avatarData}>
                {notification.name.slice(0, 1)}
              </div>
            </div>
          ) : (
            <img
              alt='Avatar'
              className={css.avatar}
              src={notification.link_avatar}
            />
          )}
        <div className={theme ? css.darkName : css.name}>
          {notification.name}
        </div>
      </div>
      <div className={css.buttonsWrapper}>
        <button
          className={css.add}
          onClick={() => {
            store.dispatch(notificationConfirm(notification.id, notification.creator_id))
          }}
        >
          {i18n.t('add')}
        </button>
        <button
          className={css.reject}
          onClick={() => {
            store.dispatch(rejectNotification(notification.id, notification.creator_id))
          }}
        >
          {i18n.t('reject')}
        </button>
      </div>
    </div>
  )
}