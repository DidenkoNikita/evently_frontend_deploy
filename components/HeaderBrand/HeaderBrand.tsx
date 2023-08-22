'use client';

import { useRouter } from "next/navigation";

import { Back } from "../icons/back.icon";
import { Share } from "../icons/share.icon";

import css from './HeaderBrand.module.css'

interface Props {
  type: string;
  title: string;
  theme: boolean;
}

export const HeaderBrand = ({ 
  type,
  title,
  theme
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => {
            if (type.length === 0) {
              router.push('/home/services/');
            }
            if (type === 'c') {
              router.push('/home/services/cafe/');
            }
            if (type === 'e') {
              router.push('/home/services/entertainment/');
            }
            if (type === 'l') {
              router.push('/home/services/leisure/');
            }
            if (type === 'f') {
              router.back();
            }
          }}
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