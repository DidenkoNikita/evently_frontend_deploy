'use client';

import { Back } from "@/components/icons/back.icon";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Edit } from "@/components/icons/edit.icon";
import { Settings } from "@/components/icons/settings.icon";

import css from './ProfileHeader.module.css';
import { useRouter } from "next/navigation";

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
            onClick={() => router.push('/home/profile/profile_settings')}
            className={css.iconButton}
          >
            <Edit color={theme ? '#FFFFFF' : '#000000'} />
          </button>
          <button
            onClick={() => router.push('/home/profile/settings')}
            className={css.iconButton}
          >
            <Settings color={theme ? '#FFFFFF' : '#000000'} />
          </button>
        </div>
      </div>
    </div>
  )
}