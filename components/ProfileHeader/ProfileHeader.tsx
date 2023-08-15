'use client';

import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";

import { Back } from "@/components/icons/back.icon";
import { Edit } from "@/components/icons/edit.icon";
import { Settings } from "@/components/icons/settings.icon";

import css from './ProfileHeader.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
}

export const ProfileHeader = ({ theme }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.push('/home')}
          className={css.iconButton}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {i18n.t('profile')}
        </div>
        <div className={css.wrapperButtons}>
          <button
            className={css.iconButton}
            onClick={() => router.push('/home/profile/profile_settings')}
          >
            <Edit color={theme ? '#FFFFFF' : '#000000'} />
          </button>
          <button
            className={css.iconButton}
            onClick={() => router.push('/home/profile/settings')}
          >
            <Settings color={theme ? '#FFFFFF' : '#000000'} />
          </button>
        </div>
      </div>
    </div>
  )
}