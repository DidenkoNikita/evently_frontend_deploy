'use client';

import { useRouter } from "next/navigation";

import { Write } from "../icons/write.icon";
import { Back } from "@/components/icons/back.icon";

import css from './HeaderChats.module.css'

interface Data {
  title: string;
  theme: boolean;
}

export const HeaderChats = ({
  title, 
  theme
}: Data): JSX.Element => {
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