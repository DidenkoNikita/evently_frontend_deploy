'use client';

import { HeaderBrand } from "@/components/HeaderBrand/HeaderBrand";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from "@/components/Footer/Footer";

import css from './BrandPage.module.css';
import { Grade } from "@/components/icons/grade.icon";
import { ActiveGrade } from "@/components/icons/activeGrade.icon";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { getPost } from "@/store/actions/getPosts";
import { getComment } from "@/store/actions/getComments";
import { History } from "@/components/History/History";
import { WriteReview } from "@/components/WriteReview/WriteReview";
import { Subscribe } from "@/components/icons/subscribe.icon";
import { Heart } from "@/components/icons/heart.icon";
import { brandGet } from "@/store/actions/getBrand";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { PostBrand } from "../PostBrand/PostBrand";
import { reviewGet } from "@/store/actions/reviewsGet";
import { EventComponent } from "../EventComponent/EventComponent";
import { useRouter } from "next/navigation";
import { createSubscription } from "@/store/actions/createSubscription";
import { getSubscriptions } from "@/store/actions/getSubscription";
import { removeSubscription } from "@/store/actions/removeSubscription";

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
}

export default function BrandPage({ id }: Props): JSX.Element {
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number | null>(null);

  useEffect(() => {
    store.dispatch(getPost());
    store.dispatch(getComment());
    store.dispatch(brandGet());
    store.dispatch(reviewGet());
    store.dispatch(getSubscriptions());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setIdUser(Number(userId));
  }, []);

  const router = useRouter();

  const brands = useSelector((state: State) => state.brand);
  console.log(brands);

  const filteredBrand = brands.find((brand) => brand.id === id);
  console.log(filteredBrand);

  const arr = [0, 1, 2, 3, 4];

  const arrButtons = [
    i18n.t('news'),
    i18n.t('stories'),
    i18n.t('reviews'),
    i18n.t('events')
  ]

  const subscriptions = useSelector((state: State) => state.subscription);
  console.log('subscriptions', subscriptions);

  const findSubscribedUser = subscriptions.find((subscription) => subscription.user_id === idUser && subscription.brand_id === id);
  console.log(findSubscribedUser);


  return (
    <div>
      <HeaderBrand
        title={i18n.t('calendar_of_events')}
      />
      <div className={css.wrapper}>
        <img
          src={filteredBrand?.link_photo}
          className={css.avatar}
        />
        <div className={css.container}>
          <div className={css.wrapperName}>
            <div className={css.name}>
              {filteredBrand?.name}
            </div>
            <div className={css.gradeWrapper}>
              {
                arr.map((index) => {
                  return (
                    <div
                      key={index}
                      className={css.grade}
                    >
                      {
                        index === 4 ? (
                          <Grade />
                        ) : (
                          <ActiveGrade />
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={css.containerData}>
            <ul className={css.list}>
              <li className={css.listElement}>
                {filteredBrand?.address}
              </li>
              <li className={css.listElement}>
                {filteredBrand?.phone}
              </li>
              <li className={css.listElement}>
                <a href={filteredBrand?.site_link}>{filteredBrand?.name_site}</a>
              </li>
            </ul>
            <button
              className={css.more}
              onClick={() => {
                setActiveModal(!activeModal)
              }}
            >
              {i18n.t('More')}
            </button>
            <div className={activeModal ? (findSubscribedUser ? css.activeSubscribedModal : css.activeModal) : css.modal}>
              {
                findSubscribedUser ? (
                  <button
                    className={css.element}
                    onClick={() => {
                      store.dispatch(removeSubscription(id));
                      setActiveModal(!activeModal);
                    }}
                  >
                    <div className={css.subscribeTitle}>
                      {i18n.t('unsubscribe')}
                    </div>
                    <div className={css.icon}>
                      <Subscribe />
                    </div>
                  </button>
                ) : (
                  <button
                    className={css.element}
                    onClick={() => {
                      store.dispatch(createSubscription(id));
                      setActiveModal(!activeModal);
                    }}
                  >
                    <div className={css.subscribeTitle}>
                      {i18n.t('Subscribe')}
                    </div>
                    <div className={css.icon}>
                      <Subscribe />
                    </div>
                  </button>
                )
              }
              <button className={css.element}>
                <div className={css.subscribeTitle}>
                  {i18n.t('add_to_favorites')}
                </div>
                <div className={css.icon}>
                  <Heart />
                </div>
              </button>
            </div>
          </div>
          <div className={css.wrapperButtons}>
            <button
              className={css.buttonChat}
              onClick={() => {
                router.push('/chats')
              }}
            >
              {i18n.t('chat')}
            </button>
            <button className={css.buttonChat}>
              {i18n.t('book_a_table')}
            </button>
          </div>
          <div className={css.listButtons}>
            {
              arrButtons.map((element, index) => {
                return (
                  <button
                    key={index}
                    className={activeButton === index ? css.activeButton : css.button}
                    onClick={() => {
                      setActiveButton(index)
                    }}
                  >
                    {element}
                  </button>
                )
              })
            }
          </div>
        </div>
        <div className={css.wrap}>
          {(() => {
            switch (activeButton) {
              case 0:
                return (
                  <PostBrand id={id} />
                )
              case 1:
                return (
                  <div className={css.stories}>
                    <History />
                  </div>
                )
              case 2:
                return (
                  <div>
                    <WriteReview
                      id={id}
                    />
                  </div>
                )
              default:
                return (
                  <div>
                    <EventComponent
                      id={id}
                    />
                  </div>
                )
            }
          })()}
        </div>
      </div>
      <Footer />
    </div>
  )
}