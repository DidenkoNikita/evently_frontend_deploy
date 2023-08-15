import i18n from "i18next";

import resources from "@/locales/resource";

import css from './ButtonNext.module.css';

i18n.init({
  resources,
  lng: "en"
});


interface Next {
  activeStep: number;
  handleNextStep: () => void;
  openCalendar: boolean;
}

export const ButtonNext = ({
  openCalendar,
  handleNextStep
}: Next): JSX.Element => {
  return (
    <button
      onClick={() => handleNextStep()}
      className={openCalendar ? css.closedButton : css.button}
    >
      {i18n.t('next')}
    </button>
  )
}