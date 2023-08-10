'use client';

import { useRouter } from 'next/navigation';
import css from './HeaderFilter.module.css';
import { Back } from '../icons/back.icon';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Filter } from '../icons/filter.icon';
import { Brand } from '@/store/counter/brandSlice';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  title: string;
  setStateFilter: any;
  filterBrands: Brand[] | [];
}

export const HeaderFilter = ({ title, setStateFilter, filterBrands }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <div className={css.headerWrapper}>
      <div className={css.header}>
        <button
          onClick={() => {
            if (title === 'Brands resultes' || title === 'City' || title === 'Categories' || title === 'Date') {
              setStateFilter(false);
            } else {
              router.back();
            }
          }}
          className={css.iconButton}
        >
          <Back />
        </button>
        <div className={css.title}>
          {title}
        </div>
        <div className={css.wrapperButtons}>
          {
            title === 'Brands resultes' ? (
              <button 
                className={css.resultButton}
                onClick={() => {
                  setStateFilter(false);
                }}
              >
                <Filter />
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
                    className={css.button}
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