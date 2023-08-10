'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './EventPage.module.css';
import { Event } from "@/store/counter/eventSlice";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  event: Event | undefined;
}

export default function EventPage({ event }: Props): JSX.Element {

  const arr = [
    i18n.t('wont_go'),
    i18n.t('will_go')
  ]

  const arrAvatar = [
    '../../../people1.png',
    '../../../people2.png',
    '../../../people3.png',
    '../../../people4.png',
    '../../../people5.png',
    '../../../people6.png'
  ]

  return (
    <div className={css.wrapper}>
      <img
        src={event?.link_photo}
        className={css.avatar}
      />
      <div className={css.container}>
        <div className={css.wrapperName}>
          <div className={css.name}>
            {event?.name}
          </div>
        </div>
        <div className={css.containerData}>
          <ul className={css.list}>
            <li className={css.listElement}>
              {event?.address}
            </li>
            <li className={css.listElement}>
              {event?.phone}
            </li>
            <li className={css.listElement}>
              <a href={event?.site_link}>{event?.name_site}</a>
            </li>
          </ul>
        </div>
        <div className={css.wrap}>
          <div className={css.name}>
            {event?.date}
          </div>
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
        <div className={css.wrapperAvatar}>
          <div className={css.avatarContainer}>
            <div className={css.avatarList}>
              {
                arrAvatar.map((avatar, index) => {
                  return (
                    <img 
                      key={index}
                      src={avatar}
                      className={css.avatarElemet}
                    />
                  )
                })
              }
            </div>
            <div className={css.title}>
              {i18n.t('people_going')}
            </div>
          </div>
          <button className={css.guests}>
            {i18n.t('guests')}
          </button>
        </div>
      </div>
    </div>
  )
}