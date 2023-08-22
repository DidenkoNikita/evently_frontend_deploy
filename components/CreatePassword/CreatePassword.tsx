'use client'

import { useState } from 'react';

import i18n from "i18next";

import resources from "@/locales/resource";

import { EyeOn } from '../icons/eyeOn.icon';
import { EyeOff } from '../icons/eyeOff.icon';
import { ButtonNext } from '../ButtonNext/ButtonNext';

import css from './CreatePassword.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface CreatePassword {
  click: boolean;
  userTheme: string;
  activeStep: number;
  statePassword: string;
  openCalendar: boolean;
  stateVerificationPassword: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setStatePassword: React.Dispatch<React.SetStateAction<string>>;
  setStateVerificationPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const CreatePassword = ({
  click,
  setClick,
  userTheme,
  activeStep,
  openCalendar,
  statePassword,
  setActiveStep,
  setStatePassword,
  stateVerificationPassword,
  setStateVerificationPassword
}: CreatePassword): JSX.Element => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [visibilityVerification, setVisibilityVerification] = useState<boolean>(false);
  const [inputVerificationType, setInputVerificationType] = useState<string>('password');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const password = e.target.value;
    setStatePassword(password);
    setValidatePassword(false);
  };

  const handleVerificationPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const verificationPassword = e.target.value;
    setStateVerificationPassword(verificationPassword);
    setValidatePassword(false);
  };

  const handleNextStep = (): void => {
    if (statePassword.length < 8 ||
      !/[a-z]/.test(statePassword) ||
      !/[A-Z]/.test(statePassword) ||
      !/\d/.test(statePassword) ||
      !/[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]/.test(statePassword) || 
      statePassword !== stateVerificationPassword
    ) {
      setValidatePassword(true);
    }

    if (statePassword.length >= 8 &&
      /[a-z]/.test(statePassword) &&
      /[A-Z]/.test(statePassword) &&
      /\d/.test(statePassword) &&
      /[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]/.test(statePassword) && 
      statePassword === stateVerificationPassword
    ) {
      setValidatePassword(false);
      setActiveStep(++activeStep);
    }
  }

  return (
    <div className={css.area}>
      <div className={userTheme === 'dark' ? css.darkHeader : css.header}>
        {i18n.t('create_password')}
      </div>
      <div className={validatePassword ? css.wrapperValidatePassword : css.wrapper}>
        <div
          className={
            validatePassword ? (
              userTheme === 'dark' ? css.darkInvalidPassword : css.invalidPassword
            ) : (
              userTheme === 'dark' ? css.darkFieldPassword : css.fieldPassvord
            )
          }
        >
          <input
            id="password"
            type={inputType}
            autoComplete='off'
            value={statePassword}
            placeholder={i18n.t('psw')}
            name="unique-password-field"
            onChange={handlePasswordChange}
            className={userTheme === 'dark' ? css.darkInputPassword : css.inputPassword}
          />
          <button
            className={css.buttonEye}
            onClick={() => {
              setVisibility(!visibility);
              if (inputType === 'password') {
                setInputType('text');
              } else {
                setInputType('password');
              }
            }}
          >
            {!visibility ? <EyeOff /> : <EyeOn />}
          </button>
        </div>
        {
          validatePassword ? (
            <span className={css.error}>
              {i18n.t('invalid_password')}
            </span>
          ) : null
        }
        <div className={userTheme === 'dark' ? css.darkFieldPassword : css.fieldPassvord}>
          <input
            autoComplete='off'
            id="verificationPassword"
            type={inputVerificationType}
            value={stateVerificationPassword}
            placeholder={i18n.t('enter_again')}
            name="unique-verification-password-field"
            onChange={handleVerificationPasswordChange}
            className={userTheme === 'dark' ? css.darkInputPassword : css.inputPassword}
          />
          <button
            className={css.buttonEye}
            onClick={() => {
              setVisibilityVerification(!visibilityVerification);
              if (inputVerificationType === 'password') {
                setInputVerificationType('text');
              } else {
                setInputVerificationType('password');
              }
            }}
          >
            {!visibilityVerification ? <EyeOff /> : <EyeOn />}
          </button>
        </div>
        <div className={css.checkboxArea}>
          <div className={css.checkboxWrapper}>
            <button
              className={!click ? css.checkbox : css.activeCheckbox}
              onClick={() => {
                setClick(!click);
              }}
            >
            </button>
          </div>
          <div className={userTheme === 'dark' ? css.darkText : css.text}>
            {i18n.t('remember')}
          </div>
        </div>
      </div>
      <ButtonNext
        activeStep={activeStep}
        handleNextStep={handleNextStep}
        openCalendar={openCalendar}
      />
    </div>
  );
};
