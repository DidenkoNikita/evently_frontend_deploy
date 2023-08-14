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
  event: Event;
  theme: boolean;
}

export const EventElement = ({ event, theme }: Props): JSX.Element => {
  const arr = [
    i18n.t('wont_go'),
    i18n.t('will_go')
  ]

  const router = useRouter();

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <button
        className={css.data}
        onClick={() => {
          router.push(`/home/services/event/${event.id}`)
        }}
      >
        <div className={theme ? css.darkName : css.name}>
          {event.name}
        </div>
        <div className={css.container}>
          <img
            src={event.link_photo}
            className={css.photo}
          />
          <ul className={css.list}>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event.phone}
            </li>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event.date}
            </li>
            <li className={theme ? css.darkListElement : css.listElement}>
              <a 
                href={event.site_link}
                className={theme ? css.darkLink: css.link}
              >
                {event.name_site}
              </a>
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
                className={index === 1 ? css.activeButton : (theme ? css.darkButton : css.button)}
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