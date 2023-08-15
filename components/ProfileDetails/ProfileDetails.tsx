'use client';

import { useState } from 'react';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Calendar } from '../icons/calendar.icon';
import { DatePicker } from '../Calendar/Calendar';
import { ButtonNext } from '../ButtonNext/ButtonNext';
import { ArrowToDown } from '../icons/arrowToDown.icon';

import css from './ProfileDetails.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface ProfileDetails {
  userTheme: string;
  stateName: string;
  stateDate: string;
  activeStep: number;
  stateGender: string;
  openCalendar: boolean;
  setStateGender: React.Dispatch<React.SetStateAction<any>>;
  setStateName: React.Dispatch<React.SetStateAction<string>>;
  setStateDate: React.Dispatch<React.SetStateAction<string>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileDetails = ({
  stateName,
  stateDate,
  userTheme,
  activeStep,
  stateGender,
  setStateName,
  setStateDate,
  openCalendar,
  setActiveStep,
  setStateGender,
  setOpenCalendar,
}: ProfileDetails): JSX.Element => {
  const [validateName, setValidateName] = useState<boolean>(false);

  const buttons: string[] = [i18n.t('male'), i18n.t('female'), i18n.t('no_gender')];

  const handleNextStep = (): void => {
    if (stateName.length < 3) {
      setValidateName(true);
    } else {
      setValidateName(false);
    }
    if (!validateName && stateName.length > 2 && stateDate.length > 0 && stateGender.length > 0) {
      setActiveStep(++activeStep);
    }
  }

  return (
    <div>
      <div className={css.wrapper}>
        <div className={userTheme === 'dark' ? css.darkText : css.text}>
          {i18n.t('enter_profile')}
        </div>
        <div
          className={
            validateName ? (
              userTheme === 'dark' ? css.darkInvalidInputWrapper : css.invalidInputWrapper
            ) : (
              userTheme === 'dark' ? css.darkInputWrapper : css.inputWrapper
            )
          }
        >
          <input
            type='text'
            value={stateName}
            placeholder={i18n.t('name')}
            onChange={(e) => {
              setStateName(e.target.value);
              setValidateName(false);
            }}
            className={userTheme === 'dark' ? css.darkNameInput : css.nameInput}
          />
        </div>
        {
          validateName ? (
            <span className={css.error}>
              {i18n.t('invalid_name')}
            </span>
          ) : null
        }
        <div className={userTheme ? css.darkCalendarWrapper : css.calendarWrapper}>
          <div>
            <Calendar />
          </div>
          <input
            type='text'
            value={stateDate}
            placeholder={i18n.t('date')}
            onChange={(e) => setStateDate(e.target.value)}
            className={userTheme === 'dark' ? css.darkCalendarInput : css.calendarInput}
          />
          <DatePicker
            color={false}
            userTheme={userTheme}
            setStateDate={setStateDate}
            openCalendar={openCalendar}
            setOpenCalendar={setOpenCalendar}
          />
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
                  onClick={() => {
                    setStateGender(button)
                  }}
                  className={
                    button === stateGender ? css.buttonActive : (
                      userTheme ? css.darkButton : css.button
                    )
                  }
                >
                  {button}
                </button>
              )
            })
          }
        </div>
      </div>
      <ButtonNext
        activeStep={activeStep}
        openCalendar={openCalendar}
        handleNextStep={handleNextStep}
      />
    </div>
  )
}