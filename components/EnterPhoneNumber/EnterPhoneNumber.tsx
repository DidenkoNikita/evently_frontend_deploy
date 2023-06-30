import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

import css from './EnterPhoneNumber.module.css';
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

interface InputPhone {
  setStateInputPhone: any;
  stateInputPhone: string;
}

export const EnterPhoneNumber = ({setStateInputPhone, stateInputPhone}: InputPhone): JSX.Element => {

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

  return(
    <div className={css.wrapper}>
      <div className={css.text}>{i18n.t('enter_phone')}</div>
      <div className={css.fieldPhone}>
        <PhoneInput 
          country={'ru'}
          value={stateInputPhone}
          onChange={phone => setStateInputPhone(phone)}
          onlyCountries={['ru','us']}
          placeholder={i18n.t('phone')}
          containerStyle={containerStyle}
          buttonStyle={buttonStyle}
          inputStyle={inputStyle}
        />
      </div>
    </div>
  )
}