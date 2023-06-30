'use clent';

import React, { useState } from 'react';
import { useFormik } from 'formik';

import css from './LoginForm.module.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { EyeOff } from '../icons/eyeOff.icon';
import Link from 'next/link';
import { EyeOn } from '../icons/eyeOn.icon';
import { IconButtons } from '../IconButtons/IconButtons';
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

const LoginForm = () => {

  const [click, setClick] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  const [visibility, setVisibility] = useState<boolean>(false);

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
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.phone) {
        errors.phone = 'Введите номер телефона';
      }

      if (!values.password) {
        errors.password = 'Введите пароль';
      }

      return errors;
    },
  });

  return (
    <div>

      <form 
        onSubmit={formik.handleSubmit}
        className={css.form}
      >
        <div className={css.fieldPhone}>
          <PhoneInput 
            country={'ru'}
            value={formik.values.phone}
            onChange={formik.handleChange}
            onlyCountries={['ru','us']}
            placeholder={i18n.t('phone')}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            inputStyle={inputStyle}
          />
        </div>
        <div className={css.fieldPassvord}>
          <input
            type={inputType}
            id="password"
            name="password"
            className={css.inputPassword}
            placeholder={i18n.t('psw')}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button
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
        <div className={css.question}>{i18n.t('question')}</div>
        <Link 
          href='/'
          className={css.link}
        >
          {i18n.t('link')}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
