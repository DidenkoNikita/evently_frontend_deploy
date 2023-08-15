'use client';

import { useState } from 'react';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { Filter } from '../icons/filter.icon';

import { Review } from '@/store/counter/reviewSlice';
import { ReviewElement } from '../Review/Review';
import { AllComments } from '../icons/allComments.icon';

import css from './ReviewsComponent.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
  theme: boolean;
}

export const ReviewsComponent = ({
  id,
  theme
}: Props): JSX.Element => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const reviews: Review[] = useSelector((state: State) => state.review);
  const filteredReviews: Review[] = reviews.filter((review) => review.brand_id === id);
  const sliceReviews: Review[] = filteredReviews.slice(0, 2);

  const lenght: number = filteredReviews.length - 2;

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={theme ? css.darkTitle : css.title}>
          {i18n.t('Comments')}
        </div>
        <div className={css.icon}>
          <Filter color={theme ? '#FFFFFF' : '#000000'} />
        </div>
      </div>
      {
        filteredReviews.length > 2 && !buttonState ? (
          <div className={css.list}>
            {
              sliceReviews.map((review) => {
                return (
                  <ReviewElement
                    theme={theme}
                    key={review.id}
                    review={review}
                  />
                )
              })
            }
            <button
              className={css.button}
              onClick={() => {
                setButtonState(!buttonState);
              }}
            >
              <div className={css.text}>
                {i18n.t('view_all')}
              </div>
              <div className={css.iconInButton}>
                <AllComments />
              </div>
              <div className={css.text}>
                {lenght}
              </div>
            </button>
          </div>
        ) : (
          <div className={css.list}>
            {filteredReviews.map((review) => {
              return (
                <ReviewElement
                  theme={theme}
                  key={review.id}
                  review={review}
                />
              )
            })}
          </div>
        )
      }
    </div>
  )
}