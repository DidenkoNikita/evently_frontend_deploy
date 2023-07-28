import { ButtonNext } from "../ButtonNext/ButtonNext";
import { IconButtons } from "../IconButtons/IconButtons";

import css from './WrapperButtons.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

interface Button {
  activeStep: number;
  handleNextStep: any;
  openCalendar: boolean;
}

export const WrapperButtons = ({activeStep, handleNextStep, openCalendar}: Button): JSX.Element => {
  return (
    <div className={css.wrapperButtons}>
      <ButtonNext activeStep={activeStep} handleNextStep={handleNextStep} openCalendar={openCalendar} />
      <div className={css.or}>{i18n.t('or')}</div>
      <IconButtons />
    </div>
  )
}