'use client';

interface Title {
  title: string;
}

import { useRouter } from 'next/navigation';
import css from './SettingsHeader.module.css'
import { Back } from '../icons/back.icon';

export const SettingsHeader = ({title}: Title): JSX.Element => {
  const router = useRouter();

  return (
    <div className={css.headerWrapper}>
    <div className={css.header}>
      <button
        onClick={() => {
          router.back();
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