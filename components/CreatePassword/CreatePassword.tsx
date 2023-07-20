'use client'

import { useEffect, useState } from 'react';
import css from './CreatePassword.module.css';
import { EyeOff } from '../icons/eyeOff.icon';
import { EyeOn } from '../icons/eyeOn.icon';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

interface CreatePassword {
  statePassword: string;
  setStatePassword: any;
  stateVerificationPassword: string;
  setStateVerificationPassword: any;
  click: boolean;
  setClick: any;
}

export const CreatePassword = ({
  statePassword,
  setStatePassword,
  stateVerificationPassword,
  setStateVerificationPassword,
  click,
  setClick
}: CreatePassword): JSX.Element => {
  const [inputType, setInputType] = useState<string>('password');
  const [visibility, setVisibility] = useState<boolean>(false);
  const [inputVerificationType, setInputVerificationType] = useState<string>('password');
  const [visibilityVerification, setVisibilityVerification] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);

  // console.log(validatePassword);
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setStatePassword(password);
    if (e.target.value.length < 8 || 
      !/[a-z]/.test(e.target.value) || 
      !/[A-Z]/.test(e.target.value) || 
      !/\d/.test(e.target.value) || 
      !/[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]/.test(e.target.value)
    ) {
      setValidatePassword(true);
    } else {
      setValidatePassword(false);
    }
  };

  const handleVerificationPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const verificationPassword = e.target.value;
    setStateVerificationPassword(verificationPassword);
  };

  return (
    <div className={css.area}>
      <div className={css.header}>{i18n.t('create_password')}</div>
      <div className={css.wrapper}>
        <div className={css.fieldPassvord}>
          <input
            type={inputType}
            id="password"
            name="unique-password-field"
            className={css.inputPassword}
            placeholder={i18n.t('psw')}
            value={statePassword}
            onChange={handlePasswordChange}
            autoComplete='off'
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
        {validatePassword ? <span className={css.error}>{i18n.t('invalid_password')}</span> : null}
        <div className={css.fieldPassvord}>
          <input
            type={inputVerificationType}
            id="verificationPassword"
            name="unique-verification-password-field"
            className={css.inputPassword}
            placeholder={i18n.t('enter_again')}
            value={stateVerificationPassword}
            onChange={handleVerificationPasswordChange}
            autoComplete='off'
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
          <div className={css.text}>
            {i18n.t('remember')}
          </div>
        </div>
      </div>
    </div>
  );
};
