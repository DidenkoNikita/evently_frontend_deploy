'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";

import resources from "@/locales/resource";
import { UsersList } from "@/store/counter/usersListSlice";
import { createRequestInFriendship } from "@/requests/createRequestInFriendship";

import { City } from '../icons/city.icon';
import { Call } from "../icons/call.icon";
import { More } from "../icons/more.icon";
import { Star } from "../icons/star.icon";
import { Friend } from "../icons/friend.icon";
import { Friends } from "../icons/friends.icon";
import { ChatsIcon } from "../icons/chats.icon";
import { AddFriend } from "../icons/addFirend.icon";
import { RightIcon } from "../icons/rightIcon.icon";
import { LoadingComponent } from "../Loading/Loading";
import { Subscriptions } from "../icons/subscriptions.icon";

import css from './FriendData.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface UserData {
  userData: UsersList | undefined;
  id: number;
  theme: boolean;
}

export const FriendData = ({ userData, id, theme }: UserData): JSX.Element => {
  const [modal, stateModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [activeAlert, setActiveAlert] = useState<boolean>(false);

  const router = useRouter();

  useEffect((): void => {
    const user_id = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(Number(user_id))
  }, [])

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

  const checkUserId: number | undefined = userData.friends_id.find((i) => i === userId)

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div
        className={css.swiper}
      />
      <div className={css.dataWrapper}>
        <div className={css.nameWrapper}>
          <div className={theme ? css.darkName : css.name}>
            {userData?.name}
          </div>
          <div className={css.iconButtonWrapper}>
            <button className={css.iconButton}>
              <Call color='#000000' />
            </button>
            <button
              className={css.iconButton}
              onClick={() => {
                if (!checkUserId) {
                  createRequestInFriendship(userData.id, setActiveAlert)
                }
              }}
            >
              {checkUserId ? <Friend /> : <AddFriend color='#000000' />}
            </button>
          </div>
        </div>
        <div className={css.city}>
          <City color={theme ? '#FFFFFF' : '#000000'} />
          {userData?.city}
          <div className={activeAlert ? css.activeAlert : css.alert}>
            {i18n.t('request')}
          </div>
        </div>
        <div className={css.iconButtonWrapper}>
          {
            !userData.messageConfidentiality.nobody &&
              (userData.messageConfidentiality.my_friends && userData.friends_id.find((id) => id === userId)) ||
              userData.messageConfidentiality.all ? (
              <button
                className={css.sendMessage}
                onClick={() => router.push(`/chats/chat_with_user/${id}`)}
              >
                <ChatsIcon color='#000000' />
                <div className={css.titleButton}>
                  {i18n.t('send_message')}
                </div>
              </button>
            ) : (
              <button
                className={css.disableSendMessage}
              >
                <ChatsIcon color='#000000' />
                <div className={css.titleButton}>
                  {i18n.t('send_message')}
                </div>
              </button>
            )
          }
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
          <div
            className={theme ? css.darkCategoriesOrMood : css.categoriesOrMood}
          >
            {i18n.t('mood')}
          </div>
          <div className={css.wrapperButtons}>
            {
              moods.map((mood: string, key) => {
                if (mood === "Don't know") {
                  const word = 'do_not_know'
                  if (!userData.userMood) {
                    return <div key={key}>Loading...</div>
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
                    return <div key={key}>Loading...</div>
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
            <div className={css.button}>
              <Subscriptions />
            </div>
            <div className={theme ? css.darkType : css.type}>
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
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={css.area}>
            <div className={css.button}>
              <Friends />
            </div>
            <div className={theme ? css.darkType : css.type}>
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
        <div className={theme ? css.darkWrap : css.wrap}>
          <div className={css.area}>
            <div className={css.button}>
              <Star />
            </div>
            <div className={theme ? css.darkType : css.type}>
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
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('city')}
            </div>
            <div className={theme ? css.darkData : css.data}>
              {userData?.city}
            </div>
          </div>
          {
            !userData.phoneConfidentiality.nobody &&
              (userData.phoneConfidentiality.my_friends && userData.friends_id.find((id) => id === userId)) ||
              userData.phoneConfidentiality.all ? (
              <div className={theme ? css.darkWrapperData : css.wrapperData}>
                <div className={theme ? css.darkDataType : css.dataType}>
                  {i18n.t('phone_number')}
                </div>
                <div className={css.specialData}>
                  {userData?.phone}
                </div>
              </div>
            ) : (
              null
            )
          }
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
              {userData?.date_of_birth}
            </div>
          </div>
          <div className={theme ? css.darkWrapperData : css.wrapperData}>
            <div className={theme ? css.darkDataType : css.dataType}>
              {i18n.t('gender')}
            </div>
            <div className={theme ? css.darkData : css.data}>
              {userData?.gender}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}