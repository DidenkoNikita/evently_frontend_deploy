'use client';

import { useRouter } from "next/navigation";

import css from './HeaderBrand.module.css'
import { Back } from "../icons/back.icon";
import { Share } from "../icons/share.icon";

interface Props {
  title: string;
  theme: boolean;
}

export const HeaderBrand = ({ title, theme }: Props): JSX.Element => {
  const router = useRouter();

  return (

    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.back()}
          className={theme ? css.darkIconButton : css.iconButton}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          <Share color={theme ? '#FFFFFF' : '#000000'} />
        </div>
      </div>
    </div>
  )
}