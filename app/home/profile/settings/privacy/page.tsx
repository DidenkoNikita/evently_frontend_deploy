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

import { Footer } from "@/components/Footer/Footer";
import { Block } from "@/components/icons/block.icon";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function PrivacyPage(): JSX.Element {
  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const router = useRouter();

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  const arr = [
    {
      title: i18n.t('email'),
      type: i18n.t('all')
    },
    {
      title: i18n.t('city'),
      type: i18n.t('all')
    },
    {
      title: i18n.t('location'),
      type: i18n.t('all')
    },
    {
      title: i18n.t('subscriptions'),
      type: i18n.t('all')
    },
    {
      title: i18n.t('friends'),
      type: i18n.t('all')
    },
    {
      title: i18n.t('calls'),
      type: i18n.t('all')
    }
  ]

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('privacy')}
      />
      <div className={css.container}>
        <div className={theme ? css.darkBlackList : css.blackList}>
          <div className={css.wrap}>
            <div className={css.icon}>
              <Block />
            </div>
            <div className={theme ? css.darkText : css.text}>
              {i18n.t('black_list')}
            </div>
          </div>
          <button
            className={css.iconButton}
          >
            <RightIcon />
          </button>
        </div>
        <div className={css.settingsWrapper}>
          <div className={theme ? css.darkConfidentiality : css.confidentiality}>
            {i18n.t('confidentiality')}
          </div>
          <div className={theme ? css.darkConfidentialityWrapper : css.confidentialityWrapper}>
            <div>
              <div className={css.element}>
                <div className={theme ? css.darkText : css.text}>
                  {i18n.t('phone_number')}
                </div>
                <div className={css.dataWrapper}>
                  <div className={css.type}>
                    {
                      (() => {
                        switch (true) {
                          case user?.phoneConfidentiality?.all:
                            return i18n.t('all');
                          case user?.phoneConfidentiality?.my_friends:
                            return i18n.t('my_friends');
                          default:
                            return i18n.t('nobody');
                        }
                      })()
                    }
                  </div>
                  <button
                    className={css.button}
                    onClick={() => {
                      router.push('/home/profile/settings/privacy/confidentiality/phone')
                    }}
                  >
                    <RightIcon />
                  </button>
                </div>
              </div>
              <div className={theme ? css.darkLine : css.line} />
            </div>
            {
              arr.map((element, index) => (
                <div key={index}>
                  <div className={css.element}>
                    <div className={theme ? css.darkText : css.text}>
                      {element.title}
                    </div>
                    <div className={css.dataWrapper}>
                      <div className={css.type}>
                        {element.type}
                      </div>
                      <button
                        className={css.button}
                      >
                        <RightIcon />
                      </button>
                    </div>
                  </div>
                  <div className={theme ? css.darkLine : css.line} />
                </div>
              ))
            }
            <div className={css.element}>
              <div className={theme ? css.darkText : css.text}>
                {i18n.t('messages')}
              </div>
              <div className={css.dataWrapper}>
                <div className={css.type}>
                  {
                    (() => {
                      switch (true) {
                        case user?.messageConfidentiality?.all:
                          return i18n.t('all');
                        case user?.messageConfidentiality?.my_friends:
                          return i18n.t('my_friends');
                        default:
                          return i18n.t('nobody');
                      }
                    })()
                  }
                </div>
                <button
                  className={css.button}
                  onClick={() => {
                    router.push('/home/profile/settings/privacy/confidentiality/messages')
                  }}
                >
                  <RightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            router.back();
          }}
          className={css.save}
        >
          {i18n.t('save')}
        </button>
      </div>
      <Footer />
    </div>
  )
}