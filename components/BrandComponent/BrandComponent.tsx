'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { Review } from "@/store/counter/reviewSlice";
import { reviewGet } from "@/store/actions/reviewsGet";

import { City } from "../icons/city.icon";
import { Message } from "../icons/message.icon";
import { Brand } from "@/store/counter/brandSlice";
import { GradeComponent } from "../GradeComponent/GradeComponent";

import css from './BrandComponent.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  brand: Brand;
  link: string;
}

export const BrandComponent = ({
  link,
  brand
}: Props): JSX.Element => {
  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(reviewGet());
  }, [])

  const router = useRouter();

  const reviews: Review[] = useSelector((state: State) => state.review);
  const filteredReviews: Review[] = reviews.filter((review) => review.brand_id === brand.id);
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <button
      className={theme ? css.darkWrapper : css.wrapper}
      onClick={() => {
        router.push(`${link}/${brand.id}`)
      }}
    >
      <img
        className={css.photo}
        src={brand.link_photo}
      />
      <div className={css.container}>
        <div className={css.wrapperData}>
          <div className={theme ? css.darkName : css.name}>
            {brand.name}
          </div>
          <div className={css.grade}>
            <GradeComponent theme={theme} />
          </div>
          <div className={css.reviewsWrapper}>
            <div className={theme ? css.darkReviews : css.reviews}>
              {i18n.t('reviews')}
            </div>
            <div className={css.icon}>
              <Message color={theme ? '#FFFFFF' : '#000000'} />
            </div>
            <div className={theme ? css.darkReviews : css.reviews}>
              {filteredReviews.length}
            </div>
          </div>
        </div>
        <div className={css.wrapperAddress}>
          <div className={css.iconCity}>
            <City color={theme ? '#FFFFFF' : '#000000'} />
          </div>
          <div className={css.addressWrap}>
            <div className={theme ? css.darkAddress : css.address}>
              {`${brand.city}, `}
            </div>
            <div className={theme ? css.darkAddress : css.address}>
              {brand.address}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}