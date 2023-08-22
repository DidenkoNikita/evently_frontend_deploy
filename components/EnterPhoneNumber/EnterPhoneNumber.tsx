'use client';

import { useEffect, useState } from "react";
import i18n from "i18next";

import resources from "@/locales/resource";
import { numberCheck } from "@/requests/numberCheck";
import { WrapperButtons } from "../WrapperButtons/WrapperButtons";

import css from './EnterPhoneNumber.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface InputPhone {
  userTheme: string;
  activeStep: number;
  openCalendar: boolean;
  stateInputPhone: string;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setStateInputPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const EnterPhoneNumber = ({
  userTheme,
  activeStep,
  openCalendar,
  setActiveStep,
  stateInputPhone,
  setStateInputPhone,
}: InputPhone): JSX.Element => {
  const [state, setState] = useState<boolean | void>(false);
  const [checkNumber, setCheckNumber] = useState<boolean | void>(false);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    const validInputValue = inputValue.replace(/[^+\d]/g, "");
    const phoneNumber = validInputValue.replace('+7', '');
    setStateInputPhone(`+7${phoneNumber}`);
    setCheckNumber(false);
    if (inputValue.startsWith('+7') && inputValue.length >= 3) {
      setStateInputPhone(inputValue);
    } else if (!inputValue.startsWith('+7')) {
      setStateInputPhone('+7');
    }
  }

  useEffect((): void => {
    const updateCheckNumber = async () => {
      const result = await numberCheck(stateInputPhone);
      setState(result);
    };

    if (stateInputPhone.length === 12) {
      updateCheckNumber();
    }
  }, [stateInputPhone]);

  const handleNextStep = (): void => {
    if (stateInputPhone.length === 12) {
      setCheckNumber(state)
      if (!checkNumber && !state) {
        setActiveStep((prevStep: number) => prevStep + 1);
      }
    } else {
      numberCheck(stateInputPhone);
    }
  }

  return (
    <div>
      <div className={checkNumber ? css.area : css.invalidArea}>
        <div className={css.wrapper}>
          <div className={userTheme === 'dark' ? css.darkText : css.text}>
            {i18n.t('enter_phone')}
          </div>
          <div
            className={
              checkNumber ? (
                userTheme === 'dark' ? css.darkInvalidFieldPhone : css.invalidFieldPhone
              ) : (
                userTheme === 'dark' ? css.darkFieldPhone : css.fieldPhone
              )
            }
          >
            <input
              type='tel'
              id='phone'
              name='phone'
              maxLength={12}
              value={stateInputPhone}
              placeholder={i18n.t('phone')}
              onChange={handlePhoneInputChange}
              className={userTheme === 'dark' ? css.darkInputPhone : css.inputPhone}
            />
          </div>
        </div>
        {checkNumber ? (
          <span className={css.error}>
            {i18n.t('invalid_number')}
          </span>
        ) : null}
      </div>
      <WrapperButtons
        userTheme={userTheme}
        activeStep={activeStep}
        openCalendar={openCalendar}
        handleNextStep={handleNextStep}
      />
    </div>
  )
}