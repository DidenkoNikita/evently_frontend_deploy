'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { City } from '../icons/city.icon';
import css from './FriendData.module.css';
import { Subscriptions } from "../icons/subscriptions.icon";
import { RightIcon } from "../icons/rightIcon.icon";
import { Friends } from "../icons/friends.icon";
import { PurpleHeart } from "../icons/purpleHeart.icon";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { UsersList } from "@/store/counter/usersListSlice";
import { Call } from "../icons/call.icon";
import { AddFriend } from "../icons/addFirend.icon";
import { ChatsIcon } from "../icons/chats.icon";
import { More } from "../icons/more.icon";
import { useRouter } from "next/navigation";
import { Star } from "../icons/star.icon";

i18n.init({
  resources,
  lng: "en"
});

interface UserData {
  userData: UsersList | undefined;
  id: number
}

export const FriendData = ({ userData, id }: UserData): JSX.Element => {

  const [modal, stateModal] = useState<boolean>(false);

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
    return <div>Loading...</div>;
  }

  return (
    <div
      className={css.wrapper}
    >
      <div
        className={css.swiper}
      />
      <div className={css.dataWrapper}>
        <div className={css.nameWrapper}>
          <div className={css.name}>{userData?.name}</div>
          <div className={css.iconButtonWrapper}>
            <button className={css.iconButton}>
              <Call />
            </button>
            <button className={css.iconButton}>
              <AddFriend />
            </button>
          </div>
        </div>
        <div className={css.city}>
          <City color='black' />
          {userData?.city}
        </div>
        <div className={css.iconButtonWrapper}>
          <button
            className={css.sendMessage}
            onClick={() => router.push(`/chats/chat_with_user/${id}`)}
          >
            <ChatsIcon />
            <div className={css.titleButton}>
              {i18n.t('send_message')}
            </div>
          </button>
          <button 
            className={css.iconButton}
            onClick={() => stateModal(!modal)}
          >
            <More />
          </button>
        </div>
        <div className={modal ? css.activeModal : css.modal}>
          <button className={css.unfriendButton}>
            {i18n.t('unfriend')}
          </button>
          <button 
            className={css.cancelButton}
            onClick={() => stateModal(!modal)}
          >
            {i18n.t('cancel')}
          </button>
        </div>
        <div className={css.wrapperCategoriesOrMood}>
          <div
            className={css.categoriesOrMood}
          >
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
          <div
            className={css.categoriesOrMood}
          >
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
        <div className={css.wrap}>
          <div className={css.area}>
            <Subscriptions />
            <div
              className={css.type}
            >
              {i18n.t('subscriptions')}
            </div>
          </div>
          <div className={css.quantityWrapper}>
            <div className={css.quantity}>456</div>
            <button className={css.button}>
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={css.wrap}>
          <div className={css.area}>
            <Friends />
            <div
              className={css.type}
            >
              {i18n.t('friends')}
            </div>
          </div>
          <div className={css.quantityWrapper}>
            <div className={css.quantity}>548</div>
            <button 
              className={css.button}
              onClick={() => router.push(`/home/profile/friends/${id}`)}
            >
              <RightIcon />
            </button>
          </div>
        </div>
        <div className={css.wrap}>
          <div className={css.area}>
            <Star />
            <div
              className={css.type}
            >
              {i18n.t('evets')}
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
          <div className={css.wrapperData}>
            <div className={css.dataType}>{i18n.t('city')}</div>
            <div className={css.data}>{userData?.city}</div>
          </div>
          <div className={css.wrapperData}>
            <div className={css.dataType}>{i18n.t('phone_number')}</div>
            <div className={css.specialData}>{userData?.phone}</div>
          </div>
          <div className={css.wrapperData}>
            <div className={css.dataType}>{i18n.t('email')}</div>
            <div className={css.specialData}>full.name@gmail.com</div>
          </div>
          <div className={css.wrapperData}>
            <div className={css.dataType}>{i18n.t('date_of_birth')}</div>
            <div className={css.data}>{userData?.date_of_birth}</div>
          </div>
          <div className={css.wrapperData}>
            <div className={css.dataType}>{i18n.t('gender')}</div>
            <div className={css.data}>{userData?.gender}</div>
          </div>
        </div>
      </div>
    </div>
  )
}