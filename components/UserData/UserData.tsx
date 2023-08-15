'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { Subscription } from "@/store/counter/subscriptionSlice";

import { City } from '../icons/city.icon';
import { Friends } from "../icons/friends.icon";
import { RightIcon } from "../icons/rightIcon.icon";
import { LoadingComponent } from "../Loading/Loading";
import { PurpleHeart } from "../icons/purpleHeart.icon";
import { Subscriptions } from "../icons/subscriptions.icon";

import css from './UserData.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface UserData {
  userData: User;
  theme: boolean;
}

export const UserData = ({
  theme,
  userData
}: UserData): JSX.Element => {
  const [id, setId] = useState<number | null>(null);

  useEffect((): void => {
    store.dispatch(userGet());
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId));
  }, []);

  const subscriptions: Subscription[] = useSelector((state: State) => state.subscription);

  const router = useRouter();

  const categories: string[] = [
    i18n.t('restaurants'),
    i18n.t('trade_fairs'),
    i18n.t('lectures'),
    i18n.t('cafe'),
    i18n.t('bars'),
    i18n.t('sport'),
    i18n.t('dancing'),
    i18n.t('games'),
    i18n.t('quests'),
    i18n.t('concerts'),
    i18n.t('parties'),
    i18n.t('show'),
    i18n.t('for_free'),
    i18n.t('cinema'),
    i18n.t('theater')
  ];

  const moods: string[] = [
    i18n.t('funny'),
    i18n.t('sad'),
    i18n.t('gambling'),
    i18n.t('romantic'),
    i18n.t('energetic'),
    i18n.t('festive'),
    i18n.t('calm'),
    i18n.t('friendly'),
    i18n.t('cognitive'),
    i18n.t('dreamy'),
    i18n.t('do_not_know')
  ];

  if (!userData || !userData?.userCategories || !userData?.userMood) {
    return <LoadingComponent />;
  }

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div
        className={css.swiper}
      />
      <div className={css.dataWrapper}>
        <div className={theme ? css.darkName : css.name}>
          {userData?.user?.name}
        </div>
        <div className={css.city}>
          <City color={theme ? '#FFFFFF' : '#000000'} />
          {userData?.user?.city}
        </div>
        <div className={css.wrapperCategoriesOrMood}>
          <div className={theme ? css.darkCategoriesOrMood : css.categoriesOrMood}>
            {i18n.t('categories')}
          </div>
          <div className={css.wrapperButtons}>
            {
              categories.map((category: string, key) => {
                const word = category.replace(/\s/g, '_').toLowerCase()
                if (userData.userCategories[word as keyof typeof userData.userCategories] === true) {
                  return (
                    <div
                      key={key}
                      className={css.card}
                    >
                      {category}
                    </div>
                  )
                } else {
                  return null
                }
              })
            }
          </div>
        </div>
        <div className={css.wrapperCategoriesOrMood}>
          <div className={theme ? css.darkCategoriesOrMood : css.categoriesOrMood}>
            {i18n.t('mood')}
          </div>
          <div className={css.wrapperButtons}>
            {
              moods.map((mood: string, key) => {
                if (mood === "Don't know") {
                  const word = 'do_not_know'
                  if (!userData.userMood) {
                    return <div>Loading...</div>
                  }
                  if (userData.userMood[word] === true) {
                    return (
                      <div
                        key={key}
                        className={css.card}
                      >
                        {mood}
                      </div>
                    )
                  } else {
                    return null;
                  }
                } else {
                  const word = mood.replace(/\s/g, '_').toLowerCase()
                  if (!userData?.userMood) {
                    return <div>Loading...</div>
                  }
                  if (userData.userMood[word as keyof typeof userData.userMood] === true) {
                    return (
                      <div
                        key={key}
                        className={css.card}
                      >
                        {mood}
                      </div>
                    )
                  } else {
                    return null;
                  }
                }
              })
            }
          </div>
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={css.area}>
            <Subscriptions />
            <div className={theme ? css.darkType : css.type}>
              {i18n.t('subscriptions')}
            </div>
          </div>
          <div className={css.quantityWrapper}>
            <div className={css.quantity}>{subscriptions.length}</div>
            <button
              className={css.button}
              onClick={() => {
                router.push('/home/profile/subscriptions')
              }}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={css.area}>
            <Friends />
            <div className={theme ? css.darkType : css.type}>
              {i18n.t('friends')}
            </div>
          </div>
          <div className={css.quantityWrapper}>
            <div className={css.quantity}>{userData.user.friends_id.length}</div>
            <button
              className={css.button}
              onClick={() => router.push(`/home/profile/friends/${id}`)}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={css.area}>
            <PurpleHeart />
            <div className={theme ? css.darkType : css.type}>
              {i18n.t('favourites')}
            </div>
          </div>
          <div className={css.quantityWrapper}>
            <div className={css.quantity}>463</div>
            <button className={css.button}>
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={css.areaData}>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('city')}
            </div>
            <div className={theme ? css.darkData : css.data}>
              {userData?.user?.city}
            </div>
          </div>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('phone_number')}
            </div>
            <div className={css.specialData}>
              {userData?.user?.phone}
            </div>
          </div>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('email')}
            </div>
            <div className={css.specialData}>
              full.name@gmail.com
            </div>
          </div>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('date_of_birth')}
            </div>
            <div className={theme ? css.darkData : css.data}>
              {userData?.user?.date_of_birth}
            </div>
          </div>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('gender')}
            </div>
            <div className={theme ? css.darkData : css.data}>
              {userData?.user?.gender}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}