'use client';

import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { User } from '@/store/counter/userSlice';


import { Map } from '../icons/map.icon';
import { City } from '../icons/city.icon';
import { Filter } from '../icons/filter.icon';
import { Search } from '../icons/search.icon';
import { Notification } from '../icons/notification.icon';
import { Acquaintance } from '../icons/acquaintance.icon';

import css from './Header.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Button {
  icon: JSX.Element;
  link: string;
}

export const Header = (): JSX.Element => {
  const icons: Button[] = [
    {
      icon: <Notification color='#000' />,
      link: '/home/notifications'
    },
    {
      icon: <Acquaintance color='#000' />,
      link: '/acquaintance'
    },
    {
      icon: <Filter color='#000' />,
      link: '/home/filter'
    },
    {
      icon: <Map />,
      link: '/map'
    }
  ];

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  const router = useRouter();

  return (
    <header className={theme ? css.darkHeader : css.header}>
      <div className={css.wrapper}>
        <div className={css.address}>
          <City color={theme ? '#FFFFFF' : '#000000'} />
          <div className={css.addressText}>
            {user ? user?.user?.city : 'Loading...'}
          </div>
        </div>
        <button className={theme ? css.darkSearchButton : css.searchButton}>
          <Search />
          {i18n.t('search')}
        </button>
      </div>
      <div className={css.buttonWrapper}>
        {icons.map((icon, key) => {
          return (
            <button
              key={key}
              className={css.button}
              onClick={() => router.push(icon.link)}
            >
              {icon.icon}
            </button>
          )
        })}
      </div>
    </header>
  );
}