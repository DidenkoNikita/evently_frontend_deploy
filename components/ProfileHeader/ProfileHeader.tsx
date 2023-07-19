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

export const ProfileHeader = (): JSX.Element => {

  const router = useRouter();

  return (
    <div className={css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.push('/home')}
          className={css.iconButton}
        >
          <Back />
        </button>
        <div className={css.title}>
          {i18n.t('profile')}
        </div>
        <div className={css.wrapperButtons}>
          <button
            onClick={() => router.push('/home/profile/profile_settings')}
            className={css.iconButton}
          >
            <Edit />
          </button>
          <button
            onClick={() => router.push('/home/profile/settings')}
            className={css.iconButton}
          >
            <Settings />
          </button>
        </div>
      </div>
    </div>
  )
}