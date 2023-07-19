import css from './ButtonNext.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});


interface Next {
  activeStep: number;
  setActiveStep: any;
  openCalendar: boolean;
}

export const ButtonNext = ({activeStep, setActiveStep, openCalendar}: Next): JSX.Element => {
  return (
    <button
      onClick={() => setActiveStep(++activeStep)}
      className={openCalendar ? css.closedButton : css.button}
    >
      {i18n.t('next')}
    </button>
  )
}