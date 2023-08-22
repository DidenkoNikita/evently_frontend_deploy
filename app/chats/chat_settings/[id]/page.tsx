'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { userGet } from "@/store/actions/getUser";
import { muteUser } from "@/store/actions/muteUser";
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";

import { Footer } from "@/components/Footer/Footer";
import { More } from "@/components/icons/more.icon";
import { Call } from "@/components/icons/call.icon";
import { MoreModal } from "@/components/MoreModal/MoreModal";
import { NotsModal } from "@/components/NotsModal/NotsModal";
import { ProfileIcon } from "@/components/icons/profile.icon";
import { SearcIcon } from "@/components/icons/searchIcon.icon";
import { LoadingComponent } from "@/components/Loading/Loading";
import { Notification } from "@/components/icons/notification.icon";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en",
});

interface ArrIcon {
  icon: JSX.Element;
  title: string;
}

export default function ChatSettings(): JSX.Element {
  const [userId, setUserId] = useState<string>('');
  const [stateMore, setStateMore] = useState<boolean>(false);
  const [stateNots, setStateNots] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(i18n.t('photos'));
  const [stateAwatar, setStateAwatar] = useState<boolean>(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);

  useEffect((): void => {
    store.dispatch(userGet());
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const id: number = Number(userId.slice(21));

  const userList: UsersList[] = useSelector((state: State) => state.usersList);
  const user: UsersList | undefined = userList.find((u) => u.id === id);

  const userData = useSelector((state: State) => state.user);
  const idUser = userData?.user?.mute_users.find((use) => use === id);  
  const theme = userData?.user?.color_theme;

  const arrIcon: ArrIcon[] = [
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

  const titleArr: string[] = [
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
          onClick={() => {
            setStateAwatar(!stateAwatar)
          }}
          className={
            stateAwatar ? (
              theme ? css.darkBigAwatarWrapper : css.bigAwatarWrapper
            ) : (
              theme ? css.darkAvatarWrapper : css.avatarWrapper
            )}
        >
          <div
            className={
              stateAwatar ?
                css.bigAvatar : (
                  theme ? css.darkAvatar : css.avatar
                )}
          >
            {
              user?.link_avatar === null ? (
                <div
                  className={
                    stateAwatar ? (
                      theme ? css.darkBigAwatarData : css.bigAvatarData
                    ) : (
                      theme ? css.darkAvatarData : css.avatarData
                    )}
                >
                  {user?.name.slice(0, 1)}
                </div>
              ) : (
                <Image
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
                    className={
                      (stateMore && index !== 4) ||
                        (stateNots && index !== 2) || 
                        (idUser && index === 2) ?
                        (theme ? css.darkIconButton : css.iconButton) :
                        css.activeIconButton
                    }
                    onClick={() => {
                      if (index === 4 && !stateNots) {
                        setStateMore(!stateMore)
                      }
                      if (index === 2 && !stateMore && !idUser) {
                        setStateNots(!stateNots)
                      }

                      if (index === 2 && !stateMore && idUser) {
                        store.dispatch(muteUser(id));
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
            id={id}
            theme={theme}
            stateNots={stateNots}
            setStateNots={setStateNots}
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
                    className={
                      index === activeButtonIndex ?
                        css.activeButton : (
                          theme ? css.darkButton : css.button
                        )}
                    onClick={() => {
                      setActiveButtonIndex(index);
                      setTitle(title);
                    }}
                  >
                    <div
                      className={
                        index !== activeButtonIndex ? (
                          theme ? css.darkTitle : css.title) :
                          css.title
                      }
                    >
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