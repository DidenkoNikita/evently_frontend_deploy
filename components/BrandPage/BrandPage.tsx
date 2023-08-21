'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getPost } from "@/store/actions/getPosts";
import { Brand } from "@/store/counter/brandSlice";
import { brandGet } from "@/store/actions/getBrand";
import { reviewGet } from "@/store/actions/reviewsGet";
import { getComment } from "@/store/actions/getComments";
import { Subscription } from "@/store/counter/subscriptionSlice";
import { getSubscriptions } from "@/store/actions/getSubscription";
import { removeSubscription } from "@/store/actions/removeSubscription";
import { createSubscription } from "@/store/actions/createSubscription";

import { SharePost } from "../SharePost/SharePost";
import { PostBrand } from "../PostBrand/PostBrand";
import { Footer } from "@/components/Footer/Footer";
import { Grade } from "@/components/icons/grade.icon";
import { Heart } from "@/components/icons/heart.icon";
import { History } from "@/components/History/History";
import { Subscribe } from "@/components/icons/subscribe.icon";
import { ActiveGrade } from "@/components/icons/activeGrade.icon";
import { EventComponent } from "../EventComponent/EventComponent";
import { WriteReview } from "@/components/WriteReview/WriteReview";
import { HeaderBrand } from "@/components/HeaderBrand/HeaderBrand";

import css from './BrandPage.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  id: number;
}

export default function BrandPage({ id }: Props): JSX.Element {
  const [idUser, setIdUser] = useState<number | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeShare, setActiveShare] = useState<boolean>(false);

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(getPost());
    store.dispatch(brandGet());
    store.dispatch(reviewGet());
    store.dispatch(getComment());
    store.dispatch(getSubscriptions());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setIdUser(Number(userId));
  }, []);

  const router = useRouter();

  const brands: Brand[] = useSelector((state: State) => state.brand);
  const filteredBrand: Brand | undefined = brands.find((brand) => brand.id === id);

  const arr: number[] = [0, 1, 2, 3, 4];

  const arrButtons: string[] = [
    i18n.t('news'),
    i18n.t('stories'),
    i18n.t('reviews'),
    i18n.t('events')
  ]

  const subscriptions: Subscription[] = useSelector((state: State) => state.subscription);
  const findSubscribedUser: Subscription | undefined = subscriptions.find((subscription) => subscription.user_id === idUser && subscription.brand_id === id);
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div>
      <HeaderBrand
        theme={theme}
        title={i18n.t('calendar_of_events')}
      />
      <div className={theme ? css.darkWrapper : css.wrapper}>
        {
          activeShare && (
            <SharePost
              postId={postId}
              setActiveModal={setActiveShare}
            />
          )
        }
        <Image
          alt='photo'
          src={String(filteredBrand?.link_photo)}
          className={css.avatar}
        />
        <div className={theme ? css.darkContainer : css.container}>
          <div className={css.wrapperName}>
            <div className={theme ? css.darkName : css.name}>
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
                          <Grade color={theme ? '#FFFFFF' : '#000000'} />
                        ) : (
                          <ActiveGrade color={theme ? '#FFFFFF' : '#000000'} />
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
              <li className={theme ? css.darkListElement : css.listElement}>
                {filteredBrand?.address}
              </li>
              <li className={theme ? css.darkListElement : css.listElement}>
                {filteredBrand?.phone}
              </li>
              <li className={theme ? css.darkListElement : css.listElement}>
                <a
                  href={filteredBrand?.site_link}
                  className={theme ? css.darkLink : css.link}
                >
                  {filteredBrand?.name_site}
                </a>
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
            <div
              className={
                activeModal ? (
                  findSubscribedUser ?
                    css.activeSubscribedModal : css.activeModal
                ) : css.modal
              }
            >
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
                  <Heart color='#000000' />
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
                    className={
                      activeButton === index ? css.activeButton : (
                        theme ? css.darkButton : css.button
                      )
                    }
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
                  <PostBrand
                    id={id}
                    theme={theme}
                    setActiveShare={setActiveShare}
                    setPostId={setPostId}
                  />
                )
              case 1:
                return (
                  <div className={css.stories}>
                    <History
                      theme={theme}
                    />
                  </div>
                )
              case 2:
                return (
                  <div>
                    <WriteReview
                      id={id}
                      theme={theme}
                    />
                  </div>
                )
              default:
                return (
                  <div>
                    <EventComponent
                      id={id}
                      theme={theme}
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