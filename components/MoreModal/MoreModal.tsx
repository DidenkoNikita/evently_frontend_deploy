import i18n from "i18next";

import resources from "@/locales/resource";

import { Pin } from '../icons/pin.icon';
import { TrashCan } from '../icons/trashCan.icon';
import { BlackList } from '../icons/blacklist.icon';
import { ShareContact } from '../icons/shareContact.icon';

import css from './MoreModal.module.css';

i18n.init({
  resources,
  lng: "en",
});

interface Props {
  theme: boolean;
  stateMore: boolean;
}

interface Arr {
  title: string;
  icon: JSX.Element;
}

export const MoreModal = ({
  theme,
  stateMore
}: Props): JSX.Element => {

  const array: Arr[] = [
    {
      title: i18n.t('share_contact'),
      icon: <ShareContact color={theme ? '#FFFFFF' : '#000000'} />
    },
    {
      title: i18n.t('pin_to_chat_list'),
      icon: <Pin color={theme ? '#FFFFFF' : '#000000'} />
    },
    {
      title: i18n.t('delete_contact'),
      icon: <TrashCan color={theme ? '#FFFFFF' : '#000000'} />
    },
    {
      title: i18n.t('add_to_blacklist'),
      icon: <BlackList />
    }
  ]

  return (
    <div
      className={
        stateMore ? (
          theme ? css.darkActiveWrapper : css.activeWrapper
        ) : css.wrapper
      }
    >
      {
        array.map((arr, index) => (
          <div
            key={index}
            className={theme ? css.darkElement : css.element}
          >
            <div className={index === 3 ? css.redTitle : (theme ? css.darkTitle : css.title)}>
              {arr.title}
            </div>
            <div className={css.icon}>
              {arr.icon}
            </div>
          </div>
        ))
      }
    </div>
  )
}