'use client';

interface Title {
  title: string;
  link: string;
}

import { useRouter } from 'next/navigation';
import css from './SettingsHeader.module.css'
import { Back } from '../icons/back.icon';
import { store } from '@/store/store';
import { userGet } from '@/store/actions/getUser';

export const SettingsHeader = ({title, link}: Title): JSX.Element => {
  const router = useRouter();

  return (
    <div className={css.headerWrapper}>
    <div className={css.header}>
      <button
        onClick={() => {
          router.push(link);
        }}
        className={css.iconButton}
      >
        <Back />
      </button>
      <div className={css.titleWrapper}>
        <div className={css.title}>
          {title}
        </div>
      </div>
    </div>
  </div>
  )
}