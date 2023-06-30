'use client';

import { useState } from 'react';
import { ArrowToDown } from '../icons/arrowToDown.icon';
import { Calendar } from '../icons/calendar.icon';

import css from './ProfileDetails.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { CustomDatePicker } from '../CustomDatePicker/CustomDatePicker';

i18n.init({
  resources,
  lng: "en"
});

interface ProfileDetails {
  stateName: string;
  stateDate: Date;
  stateGender: string;
  setStateName: any;
  setStateDate: any;
  setStateGender: any;
}

export const ProfileDetails = ({stateName, stateDate, stateGender, setStateName, setStateDate, setStateGender}: ProfileDetails): JSX.Element => {

  const [activeState, setActiveState] = useState<string>('');
  const buttons = [i18n.t('male'), i18n.t('female'), i18n.t('no_gender')];
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={css.wrapper}>
      <div className={css.text}>{i18n.t('enter_profile')}</div>
      <div className={css.inputWrapper}>
        <input 
          type='text'
          placeholder={i18n.t('name')}
          className={css.nameInput}
        />
      </div>
      <div className={css.calendarWrapper}>
        <div>
          <Calendar />
        </div>
        {/* <input 
          type='text'
          className={css.calendarInput}
          placeholder={i18n.t('date')}
        /> */}
        <CustomDatePicker />
        <button
          className={css.calendarButton}
          onClick={() => {
            handleToggle()
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
                className={button === activeState ? css.buttonActive : css.button}
                onClick={() => {
                  setActiveState(button)
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