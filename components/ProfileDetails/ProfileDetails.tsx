'use client';

import { useState } from 'react';
import { ArrowToDown } from '../icons/arrowToDown.icon';
import { Calendar } from '../icons/calendar.icon';

import css from './ProfileDetails.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { DatePicker } from '../Calendar/Calendar';

i18n.init({
  resources,
  lng: "en"
});

interface ProfileDetails {
  stateName: string;
  stateDate: string;
  stateGender: string;
  setStateName: any;
  setStateDate: any;
  setStateGender: any;
  openCalendar: boolean;
  setOpenCalendar: any;
}

export const ProfileDetails = ({stateName, stateDate, stateGender, setStateName, setStateDate, setStateGender, openCalendar, setOpenCalendar}: ProfileDetails): JSX.Element => {

  const buttons = [i18n.t('male'), i18n.t('female'), i18n.t('no_gender')];

  const [validateName, setValidateName] = useState<boolean>(false);

  return (
    <div className={css.wrapper}>
      <div className={css.text}>{i18n.t('enter_profile')}</div>
      <div className={validateName ? css.invalidInputWrapper : css.inputWrapper}>
        <input 
          type='text'
          placeholder={i18n.t('name')}
          className={css.nameInput}
          value={stateName}
          onChange={(e) => {
            setStateName(e.target.value);
            if (e.target.value.length < 3) {
              setValidateName(true)
            } else {
              setValidateName(false)
            }
          }}
        />
      </div>
      {validateName ? <span className={css.error}>{i18n.t('invalid_name')}</span> : null}
      <div className={css.calendarWrapper}>
        <div>
          <Calendar />
        </div>
        <input 
          type='text'
          className={css.calendarInput}
          placeholder={i18n.t('date')}
          value={stateDate}
          onChange={(e) => setStateDate(e.target.value)}
        />
        <DatePicker openCalendar={openCalendar} setOpenCalendar={setOpenCalendar} setStateDate={setStateDate} />
        <button
          className={css.calendarButton}
          onClick={() => {
            setOpenCalendar(!openCalendar)
          }}
        > 
          <ArrowToDown />
        </button>
      </div>
      <div className={css.buttonsWraper}>
        {
          buttons.map((button) => {
            return (
              <button 
                key={button}
                className={button === stateGender ? css.buttonActive : css.button}
                onClick={() => {
                  setStateGender(button)
                }}
              >
                {button}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}