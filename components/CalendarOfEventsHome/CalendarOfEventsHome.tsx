'use client';

import moment from 'moment';
import Link from 'next/link';
import css from './CalendarOfEventsHome.module.css';

export const CalendarOfEventsHome = (): JSX.Element => {
  const currentMonth = moment().month();
  const currentDay = moment().date();
  const daysInMonth = moment().daysInMonth();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = moment().month(currentMonth).date(day);
    const dayOfMonth = currentDate.date();
    const dayOfWeek = currentDate.format('ddd');

    daysArray.push({ dayOfMonth, dayOfWeek });
  }

  return (
    <div className={css.calendarWrapper}>
      <div className={css.wrapperHeader}>
        <div className={css.text}>Calendar of events</div>
        <Link 
          href="/service/all_dates" 
          className={css.link}
        >
          All dates
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