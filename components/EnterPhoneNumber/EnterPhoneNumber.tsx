'use client';

import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import css from './EnterPhoneNumber.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { numberCheck } from "@/requests/numberCheck";

i18n.init({
  resources,
  lng: "en"
});

interface InputPhone {
  setStateInputPhone: any;
  stateInputPhone: string;
  checkNumber: boolean;
  setCheckNumber: any;
}

export const EnterPhoneNumber = ({setStateInputPhone, stateInputPhone, checkNumber, setCheckNumber}: InputPhone): JSX.Element => {

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
    'marginLeft': '10px'
  }

  const handlePhoneInputChange = (phone: string) => {
    setStateInputPhone(phone);
    if (phone.length === 11) {
      console.log('number',phone);
      
      numberCheck(phone, setCheckNumber)
    }
  }

  return(
    <div className={checkNumber ? css.area : css.invalidArea}>
      <div className={css.wrapper}>
        <div className={css.text}>{i18n.t('enter_phone')}</div>
        <div className={checkNumber ? css.invalidFieldPhone : css.fieldPhone}>
          <PhoneInput 
            country={'ru'}
            value={stateInputPhone}
            onChange={handlePhoneInputChange}
            placeholder={i18n.t('phone')}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
            inputStyle={inputStyle}
          />
        </div>
      </div>
        {checkNumber ? <span className={css.error}>{i18n.t('invalid_number')}</span> : null}
    </div>
  )
}