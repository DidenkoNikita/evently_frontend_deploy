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
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";

import { Friend } from "@/components/Friend/Friend";
import { Footer } from "@/components/Footer/Footer";
import { EventElement } from "@/components/EventElement/EventElement";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function GuestsPage(): JSX.Element {
  const [eventId, setEventId] = useState<string>('');

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(eventsGet());
    setEventId(location.pathname);
    store.dispatch(getUserList());
  }, [])

  const id: number = Number(eventId.slice(28));

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  const events: Event[] = useSelector((state: State) => state.event);
  const filteredEvent: Event | undefined = events.find((event) => event.id === id);
  const users: UsersList[] = useSelector((state: State) => state.usersList);

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderCategoriesOrMood
        theme={theme}
        title={i18n.t('guests')}
      />
      <div className={css.container}>
        <EventElement
          theme={theme}
          event={filteredEvent}
        />
      </div>
      <div className={css.wrapperGuests}>
        {
          users.map((element, index) => (
            <Friend
              key={index}
              theme={theme}
              data={element}
            />
          ))
        }
      </div>
      <Footer />
    </div>
  )
}