'use client';

import { useRouter } from "next/navigation";

import css from './HeaderBrand.module.css'
import { Back } from "../icons/back.icon";
import { Share } from "../icons/share.icon";

interface Props {
  title: string
}

export const HeaderBrand = ({title}: Props): JSX.Element => {
  const router = useRouter();

  return (

    <div className={css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.back()}
          className={css.iconButton}
        >
          <Back />
        </button>
        <div className={css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          <Share />
        </div>
      </div>
    </div>
  )
}