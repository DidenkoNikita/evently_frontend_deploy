'use client';

import { Event } from "@/store/counter/eventSlice";

import css from './EventElement.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { useRouter } from "next/navigation";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  event: Event
}

export const EventElement = ({ event }: Props): JSX.Element => {
  const arr = [
    i18n.t('wont_go'),
    i18n.t('will_go')
  ]

  const router = useRouter();

  return (
    <div className={css.wrapper}>
      <button
        className={css.data}
        onClick={() => {
          router.push(`/home/services/event/${event.id}`)
        }}
      >
        <div className={css.name}>
          {event.name}
        </div>
        <div className={css.container}>
          <img
            src={event.link_photo}
            className={css.photo}
          />
          <ul className={css.list}>
            <li className={css.listElement}>
              {event.phone}
            </li>
            <li className={css.listElement}>
              {event.date}
            </li>
            <li className={css.listElement}>
              <a href={event.site_link}>{event.name_site}</a>
            </li>
          </ul>
        </div>
      </button>
      <div className={css.buttonWrapper}>
        {
          arr.map((element, index) => {
            return (
              <button
                key={index}
                className={index === 1 ? css.activeButton : css.button}
              >
                {element}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}