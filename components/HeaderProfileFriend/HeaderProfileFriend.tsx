'use client';

import { useRouter } from 'next/navigation';

import { Back } from '../icons/back.icon';

import css from './HeaderProfileFriend.module.css';

interface Title {
  title: string;
  theme: boolean;
}

export const HeaderProfileFriend = ({ 
  title, 
  theme
}: Title): JSX.Element => {
  const router = useRouter();

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => {
            router.back();
          }}
          className={theme ? css.darkIconButton : css.iconButton}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={css.titleWrapper}>
          <div className={theme ? css.darkTitle : css.title}>
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}