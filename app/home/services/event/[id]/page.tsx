'use client';

import { eventsGet } from "@/store/actions/eventsGet";
import { State } from "@/store/initialState";
import { store } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import css from './page.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { HeaderBrand } from "@/components/HeaderBrand/HeaderBrand";
import EventPage from "@/components/EventPage/EventPage";
import { Footer } from "@/components/Footer/Footer";

i18n.init({
  resources,
  lng: "en"
});

export default function Event(): JSX.Element {
  const [eventId, setEventId] = useState<string>('');

  useEffect(() => {
    setEventId(location.pathname);
    store.dispatch(eventsGet());
  }, [])
  
  const id = Number(eventId.slice(21));

  const events = useSelector((state: State) => state.event);
  const findEvent = events.find((event) => event.id === id);
  console.log(findEvent);
  
  return (
    <div className={css.wrapper}>
      <HeaderBrand
        title={i18n.t('calendar_of_events')}
      />
      <EventPage 
        event={findEvent}
      />
      <Footer />
    </div>
  )
}