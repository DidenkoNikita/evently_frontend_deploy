import React, { useState, useEffect, useRef } from 'react';
import moment, { Moment } from 'moment';
import css from './Calendar.module.css';
import { BackButton } from '../icons/backButton.icon';
import { Down } from '../icons/down.icon';
import { ForwardButton } from '../icons/forwardButton.icon';

import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

interface CalendarEntry {
  day: number;
  date: Date;
}

interface Calendar {
  openCalendar: boolean;
  setOpenCalendar: any;
  setStateDate: any;
  color: boolean
}

export const DatePicker = ({ openCalendar, setOpenCalendar, setStateDate, color }: Calendar): JSX.Element => {
  const daysOfTheWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [viewDate, setViewDate] = useState<Moment>(moment());
  const [viewMonthName, setViewMonthName] = useState<string>('');
  const [viewYear, setViewYear] = useState<string>('');
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [showYearList, setShowYearList] = useState<boolean>(false);

  const [year] = useState<number>(moment().year() - 60);
  const yearList = Array.from(
    { length: moment().year() - year + 1 },
    (_, index) => year + index
  );

  const yearListRef = useRef<HTMLDivElement | null>(null);
  const activeYearRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const yearListContainer = yearListRef.current;
  
    if (yearListContainer) {
      const activeYearElement = activeYearRef.current;
      if (activeYearElement) {
        const containerHeight = yearListContainer.offsetHeight;
        const elementHeight = activeYearElement.offsetHeight;
        const elementOffset = activeYearElement.offsetTop;
        const scrollTop = elementOffset - containerHeight + elementHeight + 10;
        yearListContainer.scrollTop = scrollTop;
      }
    }
  }, [showYearList, yearList]);

  let key: number = 1;

  useEffect(() => {
    const months: string[] = moment.months();
    const computeData = () => {
      if (viewDate) {
        const month: number = viewDate.month();
        const monthName: string = months[month];
        const year: number = viewDate.year();
        const daysInMonth: number = viewDate.daysInMonth();

        const entries: CalendarEntry[] = [];
        const firstOfMonth: Moment = moment(viewDate).startOf('month');
        const numberOfFillerDays: number = (firstOfMonth.day() - 1 + 7) % 7;
        for (let fillerDay = numberOfFillerDays; fillerDay > 0; fillerDay--) {
          const prevMonthDate: Date = moment(firstOfMonth).subtract(fillerDay, 'days').toDate();
          entries.push({ day: moment(prevMonthDate).date(), date: prevMonthDate });
        }
        for (let day = 1; day <= daysInMonth; day++) {
          const date: Date = moment(viewDate).date(day).toDate();
          entries.push({ day, date });
        }
        const lastOfMonth: Moment = moment(viewDate).endOf('month');
        const numberOfTrailingDays: number = (7 - lastOfMonth.day()) % 7;
        for (let trailingDay = 1; trailingDay <= numberOfTrailingDays; trailingDay++) {
          const nextMonthDate: Date = moment(lastOfMonth).add(trailingDay, 'days').toDate();
          entries.push({ day: moment(nextMonthDate).date(), date: nextMonthDate });
        }
        setViewMonthName(monthName);
        setViewYear(year.toString());
        setCalendarEntries(entries);
      }
    };

    computeData();
  }, [viewDate]);

  const isDateToday = (date: Date | null): boolean => {
    return date != null && moment().isSame(date, 'day');
  };

  const previousMonth = () => {
    setViewDate(moment(viewDate).subtract(1, 'month'));
  };

  const nextMonth = () => {
    setViewDate(moment(viewDate).add(1, 'month'));
  };

  const previousYear = () => {
    setViewDate(moment(viewDate).subtract(1, 'year'));
  };

  const nextYear = () => {
    setViewDate(moment(viewDate).add(1, 'year'));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthClick = () => {
    setShowMonthList(!showMonthList);
    setShowYearList(false);
  };

  const handleYearClick = () => {
    setShowYearList(!showYearList);
    setShowMonthList(false);
  };

  const handleMonthSelect = (month: number) => {
    setViewDate(moment(viewDate).month(month));
    setShowMonthList(false);
  };

  const handleYearSelect = (year: number) => {
    setViewDate(moment(viewDate).year(year));
    setShowYearList(false);
  };

  return (
    <div className={openCalendar ? (color ? css.colorCalendar : css.calendar) : css.closedCalendar}>
      <div className={css.header}>
        <button
          className={showMonthList || showYearList ? css.notActiveButton : (color ? css.colorBackButton : css.backButton)}
          onClick={previousMonth}
        >
          <BackButton />
        </button>
        <div className={css.monthWrapper}>
          <div
            className={showYearList ? css.notActiveMonth : css.month}
            onClick={handleMonthClick}
          >
            {viewMonthName.substring(0, 3)}
          </div>
          <button 
            onClick={handleMonthClick} 
            className={showYearList ? css.notActiveButtonDown : (color ? css.colorButtonDown : css.buttonDown)}
          >
            <Down />
          </button>
          {showMonthList && (
            <div className={color ? css.colorMonthList : css.monthList}>
              {moment.months().map((month, index) => (
                <div className={css.monthOption} key={index}>
                  <div
                    className={`${index === viewDate.month() ? (color ? css.colorCircle : css.circle) : css.notActiveCircle}`}
                  />
                  <div
                    className={`${index === viewDate.month() ? css.notActiveOption : css.option}`}
                    onClick={() => handleMonthSelect(index)}
                  >
                    {month}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className={showMonthList || showYearList ? css.notActiveButton : (color ? css.colorButton : css.button)}
          onClick={nextMonth}
        >
          <ForwardButton />
        </button>
        <button
          className={showMonthList || showYearList ? css.notActiveButton : (color ? css.colorBackButton : css.backButton)}
          onClick={previousYear}
        >
          <BackButton />
        </button>
        <div className={css.yearWrapper}>
          <div
            className={showMonthList ? css.notActiveYear : css.year}
            onClick={handleYearClick}
          >
            {viewYear}
          </div>
          <button 
            onClick={handleYearClick} 
            className={showMonthList ? css.notActiveButtonDown : (color ? css.colorButtonDown : css.buttonDown)}
          >
            <Down />
          </button>
          {showYearList && (
            <div className={color ? css.colorYearList : css.yearList} ref={yearListRef}>
              {yearList.map(
                (year) => (
                  <div className={css.yearOption} key={++key}>
                    <div
                      className={`${year === viewDate.year() ? (color ? css.colorCircle : css.circle) : css.notActiveCircle}`}
                    />
                    <div
                      key={year}
                      className={`${year === viewDate.year() ? css.notActiveOption : css.option}`}
                      onClick={() => handleYearSelect(year)}
                      ref={year === viewDate.year() ? activeYearRef : null}
                    >
                      {year}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <button
          className={showMonthList || showYearList ? css.notActiveButton : (color ? css.colorButton : css.button)}
          onClick={nextYear}
        >
          <ForwardButton />
        </button>
      </div>
      <div className={css.weekdays}>
        {daysOfTheWeek.map((day) => (
          <div key={key++} className={css.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={css.calendarEntries} >
        {calendarEntries.map((entry, index) => (
          <button
            key={index}
            className={`${(color ? css.colorCalendarEntry : css.calendarEntry)} ${isDateToday(entry.date) ? (color ? css.colorToday : css.today) : ''}`}
            onClick={() => selectDate(entry.date)}
          >
            <div 
              className={color ? css.colorDay : css.day}
            >
              {entry.day}
            </div>
          </button>
        ))}
      </div>
      <div className={css.buttonsWraper}>
        <button 
          onClick={() => setOpenCalendar(!openCalendar)} 
          className={color ? css.colorCancel : css.cancel}
        >
          {i18n.t('cancel')}
        </button>
        <button
          className={css.ok}
          onClick={() => {
            const date = selectedDate;
            const day: number = date.getDate();
            let month: number | string = date.getMonth() + 1;
            const year: number = date.getFullYear();
            if (month < 10 && month !== 12) {
              month = "0" + month;
            }
            const formattedDate = `${day}/${month}/${year}`;
            setStateDate(formattedDate);
            setOpenCalendar(!openCalendar);
          }}
        >
          {i18n.t('ok')}
        </button>
      </div>
    </div>
  );
};
