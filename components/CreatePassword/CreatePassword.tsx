'use client';

import { useState } from 'react';
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
}

export const CreatePassword = ({ statePassword, setStatePassword, stateVerificationPassword, setStateVerificationPassword }: CreatePassword): JSX.Element => {

  const [click, setClick] = useState<boolean>(false);

  const [inputType, setInputType] = useState<string>('password');
  const [visibility, setVisibility] = useState<boolean>(false);
  
  const [inputVerificationType, setInputVerificationType] = useState<string>('password');
  const [visibilityVerification, setVisibilityVerification] = useState<boolean>(false);
  
  return (
    <div className={css.area}>
      <div className={css.header}>{i18n.t('create_password')}</div>
      <div className={css.wrapper}>
        <div className={css.fieldPassvord}>
          <input
            type={inputType}
            id="password"
            name="password"
            className={css.inputPassword}
            placeholder={i18n.t('psw')}
            value={statePassword}
            onChange={(e) => setStatePassword(e.target.value)}
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
        <div className={css.fieldPassvord}>
          <input
            type={inputVerificationType}
            id="verificationPassword"
            name="verificationPassword"
            className={css.inputPassword}
            placeholder={i18n.t('enter_again')}
            value={stateVerificationPassword}
            onChange={(e) => setStateVerificationPassword(e.target.value)}
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
  )
}