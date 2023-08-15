import i18n from "i18next";

import resources from "@/locales/resource";

import { ButtonNext } from "../ButtonNext/ButtonNext";
import { IconButtons } from "../IconButtons/IconButtons";

import css from './WrapperButtons.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Button {
  userTheme: string;
  activeStep: number;
  openCalendar: boolean;
  handleNextStep: () => void;
}

export const WrapperButtons = ({
  userTheme,
  activeStep, 
  openCalendar, 
  handleNextStep
}: Button): JSX.Element => {  
  return (
    <div className={css.wrapperButtons}>
      <ButtonNext 
        activeStep={activeStep} 
        openCalendar={openCalendar} 
        handleNextStep={handleNextStep} 
      />
      <div className={userTheme === 'dark' ? css.darkOr : css.or}>
        {i18n.t('or')}
      </div>
      <IconButtons userTheme={userTheme} />
    </div>
  )
}