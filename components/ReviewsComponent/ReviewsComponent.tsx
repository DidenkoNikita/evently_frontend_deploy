'use client';

import css from './ReviewsComponent.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { Filter } from '../icons/filter.icon';
import { ReviewElement } from '../Review/Review';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '@/store/initialState';
import { AllComments } from '../icons/allComments.icon';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
}

export const ReviewsComponent = ({id}: Props): JSX.Element => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const reviews = useSelector((state: State) => state.review);
  const filteredReviews = reviews.filter((review) => review.brand_id === id);
  const sliceReviews = filteredReviews.slice(0, 2);

  const lenght = reviews.length - 2;

  console.log(lenght);

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.title}>
          {i18n.t('Comments')}
        </div>
        <div className={css.icon}>
          <Filter />
        </div>
      </div>
      {
        reviews.length > 2 && !buttonState ? (
          <div className={css.list}>
            {
              sliceReviews.map((review) => {
                return (
                  <ReviewElement
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