import i18n from "i18next";
import resources from "@/locales/resource";

import { store } from "@/store/store";
import { muteUser } from "@/store/actions/muteUser";

import css from './NotsModal.module.css';

i18n.init({
  resources,
  lng: "en",
});

interface Props {
  id: number;
  theme: boolean;
  stateNots: boolean;
  setStateNots: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotsModal = ({ 
  id,
  theme, 
  stateNots,
  setStateNots
}: Props): JSX.Element => {
  const array: string[] = [
    i18n.t('disable_for_1_hour'),
    i18n.t('disable_for_8_hours'),
    i18n.t('disable_for_1_day'),
    i18n.t('disable_for_1_week'),
    i18n.t('disable_permanently'),
    i18n.t('mute_sound')
  ]
  return (
    <div
      className={
        stateNots ? (
          theme ? css.darkActiveWrapper : css.activeWrapper
        ) : css.wrapper
      }
    >
      {
        array.map((arr, index) => (
          <button
            key={index}
            onClick={() => {
              store.dispatch(muteUser(id));
              setStateNots(!stateNots);
            }}
            className={theme ? css.darkElement : css.element}
          >
            {arr}
          </button>
        ))
      }
    </div>
  )
}