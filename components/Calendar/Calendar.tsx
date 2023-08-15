'use client';

import { useState, useEffect, useRef } from 'react';

import i18n from "i18next";
import moment, { Moment } from 'moment';

import resources from "@/locales/resource";

import { Down } from '../icons/down.icon';
import { BackButton } from '../icons/backButton.icon';
import { ForwardButton } from '../icons/forwardButton.icon';

import css from './Calendar.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface CalendarEntry {
  day: number;
  date: Date;
}

interface Calendar {
  color: boolean;
  userTheme: string;
  openCalendar: boolean;
  setStateDate: React.Dispatch<React.SetStateAction<string>>;
  setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DatePicker = ({
  color,
  userTheme,
  openCalendar,
  setStateDate,
  setOpenCalendar
}: Calendar): JSX.Element => {
  const [viewYear, setViewYear] = useState<string>('');
  const [viewDate, setViewDate] = useState<Moment>(moment());
  const [viewMonthName, setViewMonthName] = useState<string>('');
  const [showYearList, setShowYearList] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);

  const daysOfTheWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [year] = useState<number>(moment().year() - 60);
  const yearList = Array.from(
    { length: moment().year() - year + 1 },
    (_, index) => year + index
  );

  const yearListRef = useRef<HTMLDivElement | null>(null);
  const activeYearRef = useRef<HTMLDivElement | null>(null);

  useEffect((): void => {
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

  useEffect((): void => {
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

  const previousMonth = (): void => {
    setViewDate(moment(viewDate).subtract(1, 'month'));
  };

  const nextMonth = (): void => {
    setViewDate(moment(viewDate).add(1, 'month'));
  };

  const previousYear = (): void => {
    setViewDate(moment(viewDate).subtract(1, 'year'));
  };

  const nextYear = (): void => {
    setViewDate(moment(viewDate).add(1, 'year'));
  };

  const selectDate = (date: Date): void => {
    setSelectedDate(date);
  };

  const handleMonthClick = (): void => {
    setShowMonthList(!showMonthList);
    setShowYearList(false);
  };

  const handleYearClick = (): void => {
    setShowYearList(!showYearList);
    setShowMonthList(false);
  };

  const handleMonthSelect = (month: number): void => {
    setViewDate(moment(viewDate).month(month));
    setShowMonthList(false);
  };

  const handleYearSelect = (year: number): void => {
    setViewDate(moment(viewDate).year(year));
    setShowYearList(false);
  };

  return (
    <div
      className={openCalendar ? (
        color ? css.colorCalendar : (
          userTheme === 'dark' ? css.darkCalendar : css.calendar
        )
      ) : css.closedCalendar
      }
    >
      <div className={css.header}>
        <button
          onClick={previousMonth}
          className={
            showMonthList || showYearList ? css.notActiveButton : (
              color ? css.colorBackButton : (
                userTheme === 'dark' ? css.darkBackButton : css.backButton
              )
            )
          }
        >
          <BackButton />
        </button>
        <div className={css.monthWrapper}>
          <div
            onClick={handleMonthClick}
            className={
              showYearList ? css.notActiveMonth : (
                userTheme === 'dark' ? css.darkMonth : css.month
              )
            }
          >
            {viewMonthName.substring(0, 3)}
          </div>
          <button
            onClick={handleMonthClick}
            className={
              showYearList ? css.notActiveButtonDown : (
                color ? css.colorButtonDown : (
                  userTheme === 'dark' ? css.darkButtonDown : css.buttonDown
                )
              )
            }
          >
            <Down color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
          </button>
          {showMonthList && (
            <div
              className={
                color ? css.colorMonthList : (
                  userTheme === 'dark' ? css.darkMonthList : css.monthList
                )
              }
            >
              {moment.months().map((month, index) => (
                <div className={css.monthOption} key={index}>
                  <div
                    className={
                      `${index === viewDate.month() ? (
                        color ? css.colorCircle : css.circle
                      ) : css.notActiveCircle
                      }`
                    }
                  />
                  <div
                    onClick={() => handleMonthSelect(index)}
                    className={`${index === viewDate.month() ? css.notActiveOption : css.option}`}
                  >
                    {month}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={nextMonth}
          className={
            showMonthList || showYearList ? css.notActiveButton : (
              color ? css.colorButton : (
                userTheme === 'dark' ? css.darkButton : css.button
              )
            )
          }
        >
          <ForwardButton />
        </button>
        <button
          onClick={previousYear}
          className={
            showMonthList || showYearList ? css.notActiveButton : (
              color ? css.colorBackButton : (
                userTheme === 'dark' ? css.darkBackButton : css.backButton
              )
            )
          }
        >
          <BackButton />
        </button>
        <div className={css.yearWrapper}>
          <div
            onClick={handleYearClick}
            className={
              showMonthList ? css.notActiveYear : (
                userTheme === 'dark' ? css.darkYear : css.year
              )
            }
          >
            {viewYear}
          </div>
          <button
            onClick={handleYearClick}
            className={
              showMonthList ? css.notActiveButtonDown : (
                color ? css.colorButtonDown : (
                  userTheme === 'dark' ? css.darkButtonDown : css.buttonDown
                )
              )
            }
          >
            <Down color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
          </button>
          {showYearList && (
            <div
              ref={yearListRef}
              className={
                color ? css.colorYearList : (
                  userTheme ? css.darkYearList : css.yearList
                )
              }
            >
              {yearList.map(
                (year) => (
                  <div
                    key={++key}
                    className={css.yearOption}
                  >
                    <div
                      className={
                        `${year === viewDate.year() ? (
                          color ? css.colorCircle : css.circle
                        ) : css.notActiveCircle
                        }`
                      }
                    />
                    <div
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      ref={year === viewDate.year() ? activeYearRef : null}
                      className={`${year === viewDate.year() ? css.notActiveOption : css.option}`}
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
          onClick={nextYear}
          className={
            showMonthList || showYearList ? css.notActiveButton : (
              color ? css.colorButton : (
                userTheme === 'dark' ? css.darkButton : css.button
              )
            )
          }
        >
          <ForwardButton />
        </button>
      </div>
      <div className={css.weekdays}>
        {daysOfTheWeek.map((day) => (
          <div
            key={key++}
            className={userTheme === 'dark' ? css.darkWeekday : css.weekday}
          >
            {day}
          </div>
        ))}
      </div>
      <div className={css.calendarEntries} >
        {calendarEntries.map((entry, index) => (
          <button
            key={index}
            onClick={() => selectDate(entry.date)}
            className={
              `${(color ? css.colorCalendarEntry : (
                userTheme === 'dark' ? css.darkCalendarEntry : css.calendarEntry
              ))} ${isDateToday(entry.date) ? (
                color ? css.colorToday : (
                  userTheme === 'dark' ? css.darkToday : css.today
                )
              ) : ''
              }`
            }
          >
            <div
              className={
                color ? css.colorDay : (
                  userTheme === 'dark' ? css.darkDay : css.day
                )
              }
            >
              {entry.day}
            </div>
          </button>
        ))}
      </div>
      <div className={css.buttonsWraper}>
        <button
          className={
            color ? css.colorCancel : (
              userTheme ? css.darkCancel : css.cancel
            )
          }
          onClick={() => setOpenCalendar(!openCalendar)}
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
