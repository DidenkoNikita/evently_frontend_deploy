'use client';

import Link from 'next/link';

import i18n from "i18next";
import moment from 'moment';

import resources from "@/locales/resource";

import css from './CalendarOfEventsHome.module.css';

i18n.init({
  resources,
  lng: "en"
});

export const CalendarOfEventsHome = (): JSX.Element => {
  const daysArray = [];
  const currentDay = moment().date();
  const currentMonth = moment().month();
  const daysInMonth = moment().daysInMonth();

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = moment().month(currentMonth).date(day);
    const dayOfMonth = currentDate.date();
    const dayOfWeek = currentDate.format('ddd');

    daysArray.push({ dayOfMonth, dayOfWeek });
  }

  return (
    <div className={css.calendarWrapper}>
      <div className={css.wrapperHeader}>
        <div className={css.text}>
          {i18n.t('calendar_of_events')}
        </div>
        <Link
          href="/home/filter"
          className={css.link}
        >
          {i18n.t('all_dates')}
        </Link>
      </div>
      <div className={css.daysWrapper}>
        {daysArray.map((day, index) => (
          <div
            className={currentDay === day.dayOfMonth ? css.today : css.day}
            key={index}
          >
            <div className={css.wrapper}>
              <div className={css.number}>{day.dayOfMonth}</div>
              <div className={css.nameDay}>{day.dayOfWeek}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};