'use client';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { store } from '@/store/store';
import { State } from '@/store/initialState';
import { Event } from '@/store/counter/eventSlice';
import { eventsGet } from '@/store/actions/eventsGet';

import { EventElement } from '../EventElement/EventElement';
import { CalendarOfEventsHome } from '../CalendarOfEventsHome/CalendarOfEventsHome';

import css from './EventComponent.module.css';

interface Props {
  id: number;
  theme: boolean;
}

export const EventComponent = ({
  id,
  theme
}: Props): JSX.Element => {
  useEffect((): void => {
    store.dispatch(eventsGet());
  }, [])

  const events: Event[] = useSelector((state: State) => state.event);
  const filteredEvents: Event[] = events.filter((event) => event.brand_id === id);

  return (
    <div className={css.wrapper}>
      <div className={css.calendar}>
        <CalendarOfEventsHome />
      </div>
      <div className={css.eventsWrapper}>
        {
          filteredEvents.map((event, index) => (
            <EventElement
              theme={theme}
              key={index}
              event={event}
            />
          ))
        }
      </div>
    </div>
  )
}