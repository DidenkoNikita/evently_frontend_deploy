'use client';

import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { User } from '@/store/counter/userSlice';
import { Brand } from '@/store/counter/brandSlice';

import { Back } from '../icons/back.icon';
import { Filter } from '../icons/filter.icon';

import css from './HeaderFilter.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  title: string;
  setStateFilter: any;
  filterBrands: Brand[] | [];
}

export const HeaderFilter = ({
  title,
  filterBrands,
  setStateFilter
}: Props): JSX.Element => {
  const router = useRouter();

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkHeaderWrapper : css.headerWrapper}>
      <div className={css.header}>
        <button
          className={theme ? css.darkIconButton : css.iconButton}
          onClick={() => {
            if (title === 'Brands resultes' || title === 'City' || title === 'Categories' || title === 'Date') {
              setStateFilter(false);
            } else {
              router.back();
            }
          }}
        >
          <Back color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkTitle : css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          {
            title === 'Brands resultes' ? (
              <button
                className={theme ? css.darkResultButton : css.resultButton}
                onClick={() => {
                  setStateFilter(false);
                }}
              >
                <Filter color={theme ? '#FFFFFF' : '#000000'} />
                <div className={css.curcle}>
                  {filterBrands.length}
                </div>
              </button>
            ) : (
              (
                title === 'City' || title === 'Date' ? (
                  <div className={css.fake} />
                ) : (
                  <button
                    className={theme ? css.darkButton : css.button}
                  >
                    {i18n.t('reset')}
                  </button>
                )
              )
            )
          }
        </div>
      </div>
    </div>
  )
}