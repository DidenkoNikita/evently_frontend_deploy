'use client';

import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import i18n from "i18next";
import resources from "@/locales/resource";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";

import css from './page.module.css';
import { Footer } from "@/components/Footer/Footer";
import { ProfileIcon } from "@/components/icons/profile.icon";
import { Call } from "@/components/icons/call.icon";
import { Notification } from "@/components/icons/notification.icon";
import { More } from "@/components/icons/more.icon";
import { SearcIcon } from "@/components/icons/searchIcon.icon";
import { MoreModal } from "@/components/MoreModal/MoreModal";
import { NotsModal } from "@/components/NotsModal/NotsModal";
import { useRouter } from "next/navigation";
import { LoadingComponent } from "@/components/Loading/Loading";

i18n.init({
  resources,
  lng: "en",
});

export default function ChatSettings(): JSX.Element {
  const [userId, setUserId] = useState<string>('');
  const [title, setTitle] = useState<string>(i18n.t('photos'))
  const [stateAwatar, setStateAwatar] = useState<boolean>(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [stateMore, setStateMore] = useState<boolean>(false);
  const [stateNots, setStateNots] = useState<boolean>(false);

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(21));

  const userList = useSelector((state: State) => state.usersList);

  const user = userList.find((u) => u.id === id);

  const arrIcon = [
    {
      icon: <ProfileIcon />,
      title: i18n.t('profile')
    },
    {
      icon: <Call color='black' />,
      title: i18n.t('call')
    },
    {
      icon: <Notification />,
      title: i18n.t('nots')
    },
    {
      icon: <SearcIcon />,
      title: i18n.t('search2')
    },
    {
      icon: <More />,
      title: i18n.t('More')
    }
  ]

  const titleArr = [
    i18n.t('photos'),
    i18n.t('video'),
    i18n.t('clips'),
    i18n.t('places'),
    i18n.t('evets')
  ]

  const router = useRouter();

  if (user === undefined) {
    return (
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    )
  }

  return (
    <div>
      <SettingsHeader
        title={i18n.t('chats_settings')}
      />
      <div className={css.area}>
        <button
          onClick={() => setStateAwatar(!stateAwatar)}
          className={stateAwatar ? css.bigAwatarWrapper : css.avatarWrapper}
        >
          <div className={stateAwatar ? css.bigAvatar : css.avatar}>
            {
              user?.link_avatar === null ? (
                <div className={stateAwatar ? css.bigAvatarData : css.avatarData}>
                  {user?.name.slice(0, 1)}
                </div>
              ) : (
                <img
                  src={user?.link_avatar}
                  alt='Avatar'
                  className={stateAwatar ? css.bigImage : css.image}
                />
              )
            }
          </div>
        </button>
        <div className={css.wrapper}>
          <div className={css.swiper} />
          <div className={css.name}>
            {user?.name}
          </div>
          <div className={css.buttonWrapper}>
            {
              arrIcon.map((icon, index) => {
                return (
                  <button
                    key={index}
                    className={(stateMore && index !== 4) || (stateNots && index !== 2) ? css.iconButton : css.activeIconButton}
                    onClick={() => {
                      if (index === 4 && !stateNots) {
                        setStateMore(!stateMore)
                      }
                      if (index === 2 && !stateMore) {
                        setStateNots(!stateNots)
                      }

                      if (index === 0 && !stateNots && !stateMore) {
                        router.push(`/home/profile/friends/profile_friend/${id}`)
                      }
                    }}
                  >
                    <div>
                      {icon.icon}
                    </div>
                    <div
                      className={css.title}
                    >
                      {icon.title}
                    </div>
                  </button>
                )
              })
            }
          </div>
          <MoreModal
            stateMore={stateMore}
          />
          <NotsModal
            stateNots={stateNots}
          />
          {
            !user.phoneConfidentiality.nobody ? (
              <div className={css.wrapperData}>
                <div className={css.dataType}>{i18n.t('phone_number')}</div>
                <div className={css.specialData}>{user?.phone}</div>
              </div>
            ) : (
              null
            )
          }
          <div className={css.buttonWrapper}>
            {
              titleArr.map((title, index) => {
                return (
                  <button
                    key={index}
                    className={index === activeButtonIndex ? css.activeButton : css.button}
                    onClick={() => {
                      setActiveButtonIndex(index);
                      setTitle(title);
                    }}
                  >
                    <div className={css.title}>{title}</div>
                  </button>
                )
              })
            }
          </div>
          <div className={css.title}>
            {`${title}${i18n.t('from_the_chat')}`}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}