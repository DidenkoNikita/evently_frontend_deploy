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
  theme: boolean;
}

export default function EventPage({ event, theme }: Props): JSX.Element {

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
      <div className={theme ? css.darkContainer : css.container}>
        <div className={css.wrapperName}>
          <div className={theme ? css.darkName : css.name}>
            {event?.name}
          </div>
        </div>
        <div className={css.containerData}>
          <ul className={css.list}>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event?.address}
            </li>
            <li className={theme ? css.darkListElement : css.listElement}>
              {event?.phone}
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
        <div className={css.wrap}>
          <div className={theme ? css.darkName : css.name}>
            {event?.date}
          </div>
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
        <div className={theme ? css.darkWrapperAvatar : css.wrapperAvatar}>
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
            <div className={theme ? css.darkTitle : css.title}>
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