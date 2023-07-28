import css from './MoreModal.module.css';

import i18n from "i18next";
import resources from "@/locales/resource";
import { ShareContact } from '../icons/shareContact.icon';
import { Pin } from '../icons/pin.icon';
import { TrashCan } from '../icons/trashCan.icon';
import { BlackList } from '../icons/blacklist.icon';

i18n.init({
  resources,
  lng: "en",
});

interface Props {
  stateMore: boolean
}

export const MoreModal = ({stateMore}: Props): JSX.Element => {

  const array = [
    {
      title: i18n.t('share_contact'),
      icon: <ShareContact />
    },
    {
      title: i18n.t('pin_to_chat_list'),
      icon: <Pin />
    },
    {
      title: i18n.t('delete_contact'),
      icon: <TrashCan />
    },
    {
      title: i18n.t('add_to_blacklist'),
      icon: <BlackList />
    }
  ]

  return (
    <div className={stateMore ? css.activeWrapper : css.wrapper}>
      {
        array.map((arr, index) => {
          return (
            <div
              key={index}
              className={css.element}
            >
              <div className={index === 3 ? css.redTitle : css.title}>
                {arr.title}
              </div>
              <div className={css.icon}>
                {arr.icon}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}