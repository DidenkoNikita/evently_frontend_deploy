'use client';

import { Back } from "@/components/icons/back.icon";

import { useRouter } from "next/navigation";
import { Filter } from "../icons/filter.icon";

import css from './HeaderCategoriesOrMood.module.css'

interface Title {
  title: string
}

export const HeaderCategoriesOrMood = ({title}: Title): JSX.Element => {

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
          <div className={css.filter}>
            <Filter />
          </div>
        </div>
      </div>
    </div>
  )
}