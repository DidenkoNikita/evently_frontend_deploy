'use client';

import { Back } from "@/components/icons/back.icon";

import { useRouter } from "next/navigation";

import css from './HeaderChats.module.css'
import { Write } from "../icons/write.icon";

interface Data {
  title: string;
  link: string
}

export const HeaderChats = ({title, link}: Data): JSX.Element => {

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
          {title}
        </div>
        <div className={css.wrapperButtons}>
          <button 
            onClick={() => router.push(link)}
            className={css.button}
          >
            <Write />
          </button>
        </div>
      </div>
    </div>
  )
}