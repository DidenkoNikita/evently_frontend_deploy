'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { Event } from "@/store/counter/eventSlice";
import { eventsGet } from "@/store/actions/eventsGet";

import { Footer } from "@/components/Footer/Footer";
import EventPage from "@/components/EventPage/EventPage";
import { HeaderBrand } from "@/components/HeaderBrand/HeaderBrand";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function Event(): JSX.Element {
  const [eventId, setEventId] = useState<string>('');

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(eventsGet());
    setEventId(location.pathname);
  }, [])
  
  const id: number = Number(eventId.slice(21));

  const events: Event[] = useSelector((state: State) => state.event);
  const findEvent: Event | undefined = events.find((event) => event.id === id);
  
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={css.wrapper}>
      <HeaderBrand
        type="f"
        theme={theme}
        title={i18n.t('calendar_of_events')}
      />
      <EventPage 
        theme={theme}
        event={findEvent}
      />
      <Footer />
    </div>
  )
}