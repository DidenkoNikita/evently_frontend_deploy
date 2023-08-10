'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { useEffect, useState } from 'react';
import { ActiveGrade } from '../icons/activeGrade.icon';
import { Grade } from '../icons/grade.icon';
import css from './WriteReview.module.css';
import { ReviewsComponent } from "../ReviewsComponent/ReviewsComponent";
import { store } from "@/store/store";
import { createReview } from "@/store/actions/createReview";
import { reviewGet } from "@/store/actions/reviewsGet";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number
}

export const WriteReview = ({id}: Props): JSX.Element => {
  const [activeButton, setActiveButton] = useState<number>(0);
  const [stateInput, setStateInput] = useState<string>('');
  console.log(activeButton, stateInput);
  
  useEffect(() => {
    store.dispatch(reviewGet());
  }, [])

  const reviews = useSelector((state: State) => state.review);
  const filteredReviews = reviews.filter((review) => review.brand_id === id);
  console.log(filteredReviews);
  

  const arr = [0, 1, 2, 3, 4];

  return (
    <div className={css.wrapper}>
      <div className={css.gradeWrapper}>
        {
          arr.map((index) => {
            return (
              <button
                key={index}
                className={css.grade}
                onClick={() => setActiveButton(index)}
              >
                {
                  activeButton <= index++ ? (
                    <Grade />
                  ) : (
                    <ActiveGrade />
                  )
                }
              </button>
            )
          })
        }
      </div>
      <div className={css.inputWrapper}>
        <textarea 
          value={stateInput}
          onChange={(e) => {
            setStateInput(e.target.value);
          }}
          placeholder={i18n.t('comment...')}
          className={css.input}
        />
      </div>
      <button 
        className={css.button}
        onClick={() => {
          if (activeButton !== 0 && stateInput !== '') {
            store.dispatch(createReview(stateInput, activeButton, id));
            setStateInput('');
            setActiveButton(0);
          }
        }}
      >
        {i18n.t('sent')}
      </button>
      {
        filteredReviews.length === 0 ? (
          <div
            className={css.alert}
          >
            {i18n.t('write_first')}
          </div>
        ) : (
          <ReviewsComponent
            id={id}
          />
        )
      }
    </div>
  )
}