'use client';

import { useRouter } from "next/navigation";

import { Filter } from "../icons/filter.icon";
import { Back } from "@/components/icons/back.icon";

import css from './HeaderCategoriesOrMood.module.css'

interface Title {
  title: string;
  theme: boolean;
}

export const HeaderCategoriesOrMood = ({
  title,
  theme
}: Title): JSX.Element => {
  const router = useRouter();

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => router.back()}
          className={css.iconButton}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          <div className={css.filter}>
            <Filter color={theme ? '#FFFFFF' : '#000000'} />
          </div>
        </div>
      </div>
    </div>
  )
}