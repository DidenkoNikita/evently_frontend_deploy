'use clent';

import React, { useState } from 'react';
import { useFormik } from 'formik';

import css from './LoginForm.module.css';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { EyeOff } from '../icons/eyeOff.icon';
import Link from 'next/link';
import { EyeOn } from '../icons/eyeOn.icon';
import { IconButtons } from '../IconButtons/IconButtons';
import i18n from "i18next";

import resources from "@/locales/resource";
import { useRouter } from 'next/navigation';
import { login } from '@/requests/login';
import { loginWithRememberMe } from '@/requests/loginWithRememberMe';

i18n.init({
  resources,
  lng: "en"
});

const LoginForm = () => {

  const [click, setClick] = useState<boolean>(false);
  console.log(click);
  
  const [inputType, setInputType] = useState<string>('password');
  const [visibility, setVisibility] = useState<boolean>(false);

  const [validateNumber, setValidateNumber] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);

  const router = useRouter();

  const containerStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'gap': '10px',
    'minWidth': '54px',
    'height': '48px',
  }

  const buttonStyle = {
    'display': 'flex',
    'width': '54px',
    'border': 'none',
    'height': '48px',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    'gap': '10px',
    'margitRight': '0px'
  }
  const inputStyle = {
    'border': 'none',
    'backgroundColor': '#F6F6F6',
    'marginLeft': '10px',
  }

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    onSubmit: (user) => {
      if (click) {
        console.log('remember me');
        loginWithRememberMe(user, router)
      } else {
        login(user, router);
      }
      if (user.password.length < 8 || 
        !/[a-z]/.test(user.password) || 
        !/[A-Z]/.test(user.password) || 
        !/\d/.test(user.password) || 
        !/[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]/.test(user.password)
      ) {
        setValidatePassword(true);
      } else {
        setValidatePassword(false);
      }

      if (user.phone.length < 12) {
        setValidateNumber(true);
      } else {
        setValidateNumber(false);
      }
    },
    validate: (values) => {
    },
  });

  const handlePhone = (
    formattedValue: string
  ): void => {
    const phone = formattedValue.startsWith("+") ? formattedValue : `+${formattedValue}`;
    formik.handleChange('phone')(phone);    
    setValidateNumber(false);
    setValidatePassword(false);
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;
    formik.handleChange('password')(password)
    setValidateNumber(false);
    setValidatePassword(false);
  }

  return (
    <div>
      <form 
        onSubmit={formik.handleSubmit}
        className={css.form}
        autoComplete='off'
      >
        <div 
          className={validateNumber ? css.invalidFieldPhone : css.fieldPhone}
        >
          <PhoneInput 
            country={'ru'}
            value={formik.values.phone}
            onChange={handlePhone}
            onlyCountries={['ru','us']}
            placeholder={i18n.t('phone')}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            inputStyle={inputStyle}
          />
        </div>
        {validateNumber ? <span className={css.error}>{i18n.t('number_entered')}</span>: null}
        <div 
          className={validatePassword ? css.invalidFieldPassword : css.fieldPassvord}
        >
          <input
            type={inputType}
            id="password"
            name="password"
            className={css.inputPassword}
            placeholder={i18n.t('psw')}
            value={formik.values.password}
            onChange={handlePassword}
          />
          <button
            type='button'
            className={css.buttonEye}
            onClick={() => {
              setVisibility(!visibility);
              if(inputType === 'password') {
                setInputType('text');
              } else {
                setInputType('password');
              }
            }}
          >
            {!visibility ? <EyeOff /> : <EyeOn />}
          </button>
        </div>
        {validatePassword ? <span className={css.error}>{i18n.t('password_entered')}</span> : null}
        <div className={css.checkboxArea}>
          <div className={css.checkboxWrapper}>
            <button 
              type='button'
              className={!click ? css.checkbox : css.activeCheckbox}
              onClick={() => {
                setClick(!click);
              }}
            >
            </button>
          </div>
          <div className={css.text}>{i18n.t('remember')}</div>
        </div>
        <button 
          type="submit"
          className={css.button}
        >
          {i18n.t('log_in')}
        </button>
        <div className={css.or}>{i18n.t('or')}</div>
        <IconButtons />
      </form>
      <div className={css.linkWrapper}>
        <div className={css.question}>{i18n.t('do_not_have_an_account')}</div>
        <Link 
          href='/'
          className={css.link}
        >
          {i18n.t('sign_up')}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
