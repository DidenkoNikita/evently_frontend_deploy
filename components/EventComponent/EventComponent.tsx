'use client';

import { useEffect } from 'react';
import { CalendarOfEventsHome } from '../CalendarOfEventsHome/CalendarOfEventsHome';
import css from './EventComponent.module.css';
import { store } from '@/store/store';
import { eventsGet } from '@/store/actions/eventsGet';
import { useSelector } from 'react-redux';
import { State } from '@/store/initialState';
import { EventElement } from '../EventElement/EventElement';

interface Props {
  id: number;
  theme: boolean;
}

export const EventComponent = ({ id, theme }: Props): JSX.Element => {
  useEffect(() => {
    store.dispatch(eventsGet());
  }, [])

  const events = useSelector((state: State) => state.event);
  const filteredEvents = events.filter((event) => event.brand_id === id);

  console.log('events', filteredEvents);

  return (
    <div className={css.wrapper}>
      <div className={css.calendar}>
        <CalendarOfEventsHome />
      </div>
      <div className={css.eventsWrapper}>
        {
          filteredEvents.map((event, index) => {
            return (
              <EventElement
                theme={theme}
                key={index}
                event={event}
              />
            )
          })
        }
      </div>
    </div>
  )
}