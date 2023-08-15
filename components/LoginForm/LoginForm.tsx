'use clent';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useFormik } from 'formik';

import { login } from '@/requests/login';
import resources from "@/locales/resource";
import { loginWithRememberMe } from '@/requests/loginWithRememberMe';

import { EyeOn } from '../icons/eyeOn.icon';
import { EyeOff } from '../icons/eyeOff.icon';
import { IconButtons } from '../IconButtons/IconButtons';

import css from './LoginForm.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  userTheme: string;
}

const LoginForm = ({ userTheme }: Props) => {
  const [click, setClick] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  const [validateNumber, setValidateNumber] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
      color_theme: false
    },
    onSubmit: (user) => {
      user.color_theme = userTheme === 'dark' ? true : false
      if (click) {
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

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let phoneInput = event.target.value.replace(/[^\d+]/g, '');

    if (phoneInput.length > 1 && !phoneInput.startsWith('+')) {
      phoneInput = `+${phoneInput.substr(1)}`;
    }

    formik.setFieldValue('phone', phoneInput);
    setValidateNumber(false);
    setValidatePassword(false);
  };

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
          className={
            validateNumber ? (
              userTheme ? css.darkInpvalidFieldPhone : css.invalidFieldPhone
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
            onChange={handlePhone}
            placeholder={i18n.t('phone')}
            value={formik.values.phone}
            className={userTheme === 'dark' ? css.darkInputPhone : css.inputPhone}
          />
        </div>
        {
          validateNumber ? (
            <span className={css.error}>
              {i18n.t('number_entered')}
            </span>) : null
        }
        <div
          className={validatePassword ? (
            userTheme ? css.darkInvalidFieldPassword : css.invalidFieldPassword
          ) : (
            userTheme ? css.darkFieldPassword : css.fieldPassvord
          )
          }
        >
          <input
            id="password"
            name="password"
            type={inputType}
            onChange={handlePassword}
            placeholder={i18n.t('psw')}
            value={formik.values.password}
            className={userTheme === 'dark' ? css.darkInputPassword : css.inputPassword}
          />
          <button
            type='button'
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
          validatePassword ? (<span className={css.error}>
            {i18n.t('password_entered')}
          </span>
          ) : null
        }
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
          <div className={userTheme === 'dark' ? css.darkText : css.text}>
            {i18n.t('remember')}
          </div>
        </div>
        <button
          type="submit"
          className={css.button}
        >
          {i18n.t('log_in')}
        </button>
        <div className={userTheme ? css.darkOr : css.or}>
          {i18n.t('or')}
        </div>
        <IconButtons
          userTheme={userTheme}
        />
      </form>
      <div className={css.linkWrapper}>
        <div className={userTheme ? css.darkQuestion : css.question}>
          {i18n.t('do_not_have_an_account')}
        </div>
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
