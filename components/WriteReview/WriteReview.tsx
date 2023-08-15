'use client';

import { useEffect, useState } from 'react';

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { reviewGet } from "@/store/actions/reviewsGet";
import { createReview } from "@/store/actions/createReview";

import { Grade } from '../icons/grade.icon';
import { ActiveGrade } from '../icons/activeGrade.icon';
import { ReviewsComponent } from "../ReviewsComponent/ReviewsComponent";

import css from './WriteReview.module.css';
import { Review } from '@/store/counter/reviewSlice';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
  theme: boolean;
}

export const WriteReview = ({
  id,
  theme
}: Props): JSX.Element => {
  const [stateInput, setStateInput] = useState<string>('');
  const [activeButton, setActiveButton] = useState<number>(0);
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [checkButton, setCheckButton] = useState<boolean>(false);

  useEffect((): void => {
    store.dispatch(reviewGet());
  }, [])

  const reviews: Review[] = useSelector((state: State) => state.review);
  const filteredReviews: Review[] = reviews.filter((review) => review.brand_id === id);

  const arr: number[] = [0, 1, 2, 3, 4];

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div className={css.gradeWrapper}>
        {
          arr.map((index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveButton(index);
                  setCheckButton(false);
                }}
                className={theme ? css.darkGrade : css.grade}
              >
                {
                  activeButton <= index++ ? (
                    <Grade color={checkButton ? '#EB5757' : (theme ? '#FFFFFF' : '#000000')} />
                  ) : (
                    <ActiveGrade color={theme ? '#FFFFFF' : '#000000'} />
                  )
                }
              </button>
            )
          })
        }
      </div>
      <div
        className={
          checkInput ? (
            theme ? css.darkInvalidWrapper : css.invalidWrapper
          ) : (
            theme ? css.darkInputWrapper : css.inputWrapper
          )
        }
      >
        <textarea
          value={stateInput}
          onChange={(e) => {
            setStateInput(e.target.value);
            setCheckInput(false);
          }}
          placeholder={i18n.t('comment...')}
          className={theme ? css.darkInput : css.input}
        />
      </div>
      {
        checkInput && (
          <span className={css.error}>
            {i18n.t('pleas_fill')}
          </span>
        )
      }
      <button
        className={css.button}
        onClick={() => {
          if (activeButton !== 0 && stateInput !== '') {
            store.dispatch(createReview(stateInput, activeButton, id));
            setStateInput('');
            setActiveButton(0);
          }
          if (activeButton === 0) {
            setCheckButton(true);
          }

          if (stateInput === '') {
            setCheckInput(true);
          }
        }}
      >
        {i18n.t('sent')}
      </button>
      {
        filteredReviews.length === 0 ? (
          <div
            className={theme ? css.darkAlert : css.alert}
          >
            {i18n.t('write_first')}
          </div>
        ) : (
          <ReviewsComponent
            id={id}
            theme={theme}
          />
        )
      }
    </div>
  )
}