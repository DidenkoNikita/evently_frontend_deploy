import { ButtonNext, Next } from "../ButtonNext/ButtonNext";
import { IconButtons } from "../IconButtons/IconButtons";

import css from './WrapperButtons.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

export const WrapperButtons = ({activeStep, setActiveStep}: Next): JSX.Element => {
  return (
    <div className={css.wrapperButtons}>
      <ButtonNext activeStep={activeStep} setActiveStep={setActiveStep}/>
      <div className={css.or}>{i18n.t('or')}</div>
      <IconButtons />
    </div>
  )
}