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
import { userGet } from "@/store/actions/getUser";

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
    store.dispatch(userGet());
  }, []);

  const id: number = Number(userId.slice(21));

  const userList = useSelector((state: State) => state.usersList);

  const user = userList.find((u) => u.id === id);

  const userData = useSelector((state: State) => state.user);
  const theme = userData?.user?.color_theme;

  const arrIcon = [
    {
      icon: <ProfileIcon color='black' />,
      title: i18n.t('profile')
    },
    {
      icon: <Call color='black' />,
      title: i18n.t('call')
    },
    {
      icon: <Notification color='black' />,
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
      <div className={theme ? css.darkLoading : css.loading}>
        <LoadingComponent />
      </div>
    )
  }

  return (
    <div>
      <SettingsHeader
        theme={theme}
        title={i18n.t('chats_settings')}
      />
      <div className={theme ? css.darkArea : css.area}>
        <button
          onClick={() => setStateAwatar(!stateAwatar)}
          className={stateAwatar ? (theme ? css.darkBigAwatarWrapper : css.bigAwatarWrapper) : (theme ? css.darkAvatarWrapper : css.avatarWrapper)}
        >
          <div className={stateAwatar ? css.bigAvatar : (theme ? css.darkAvatar : css.avatar)}>
            {
              user?.link_avatar === null ? (
                <div className={stateAwatar ? (theme ? css.darkBigAwatarData : css.bigAvatarData) : (theme ? css.darkAvatarData : css.avatarData)}>
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
        <div className={theme ? css.darkWrapper : css.wrapper}>
          <div className={css.swiper} />
          <div className={theme ? css.darkName : css.name}>
            {user?.name}
          </div>
          <div className={css.buttonWrapper}>
            {
              arrIcon.map((icon, index) => {
                return (
                  <button
                    key={index}
                    className={(stateMore && index !== 4) || (stateNots && index !== 2) ? (theme ? css.darkIconButton : css.iconButton) : css.activeIconButton}
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
            theme={theme}
            stateMore={stateMore}
          />
          <NotsModal
            theme={theme}
            stateNots={stateNots}
          />
          {
            !user.phoneConfidentiality.nobody ? (
              <div className={theme ? css.darkWrapperData : css.wrapperData}>
                <div className={theme ? css.darkDataType : css.dataType}>
                  {i18n.t('phone_number')}
                </div>
                <div className={css.specialData}>
                  {user?.phone}
                </div>
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
                    className={index === activeButtonIndex ? css.activeButton : (theme ? css.darkButton : css.button)}
                    onClick={() => {
                      setActiveButtonIndex(index);
                      setTitle(title);
                    }}
                  >
                    <div className={index !== activeButtonIndex ? (theme ? css.darkTitle : css.title) : css.title}>
                      {title}
                    </div>
                  </button>
                )
              })
            }
          </div>
          <div className={theme ? css.darkTitle : css.title}>
            {`${title}${i18n.t('from_the_chat')}`}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}