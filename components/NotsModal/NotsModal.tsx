import i18n from "i18next";
import resources from "@/locales/resource";

import css from './NotsModal.module.css';

i18n.init({
  resources,
  lng: "en",
});

interface Props {
  theme: boolean;
  stateNots: boolean;
}

export const NotsModal = ({ 
  theme, 
  stateNots 
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
          <div
            key={index}
            className={theme ? css.darkElement : css.element}
          >
            {arr}
          </div>
        ))
      }
    </div>
  )
}