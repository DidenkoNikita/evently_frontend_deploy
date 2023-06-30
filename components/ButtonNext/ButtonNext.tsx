import css from './ButtonNext.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});


export interface Next {
  activeStep: number;
  setActiveStep: any;
}

export const ButtonNext = ({activeStep, setActiveStep}: Next): JSX.Element => {
  return (
    <button
      onClick={() => setActiveStep(++activeStep)}
      className={css.button}
    >
      {i18n.t('next')}
    </button>
  )
}