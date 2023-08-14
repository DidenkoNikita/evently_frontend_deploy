'use client';

import { Back } from "@/components/icons/back.icon";

import { useRouter } from "next/navigation";

import css from './HeaderChats.module.css'
import { Write } from "../icons/write.icon";

interface Data {
  title: string;
  link: string;
  theme: boolean;
}

export const HeaderChats = ({title, link, theme}: Data): JSX.Element => {

  const router = useRouter();

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.push(link)}
          className={theme ? css.darkIconButton : css.iconButton}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          <button 
            onClick={() => router.push(`/chats/write_a_message`)}
            className={theme ? css.darkButton : css.button}
          >
            <Write color={theme ? '#FFFFFF' : '#000000'} />
          </button>
        </div>
      </div>
    </div>
  )
}