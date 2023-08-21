'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Event } from "@/store/counter/eventSlice";

import css from './EventElement.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  event: Event | undefined;
}

export const EventElement = ({
  event,
  theme
}: Props): JSX.Element => {
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
          router.push(`/home/services/event/${event?.id}`)
        }}
      >
        <div className={theme ? css.darkName : css.name}>
          {event?.name}
        </div>
        <div className={css.container}>
          <Image
            alt='photo'
            className={css.photo}
            src={String(event?.link_photo)}
          />
          <ul className={css.list}>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event?.phone}
            </li>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event?.date}
            </li>
            <li className={theme ? css.darkListElement : css.listElement}>
              <a
                href={event?.site_link}
                className={theme ? css.darkLink : css.link}
              >
                {event?.name_site}
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