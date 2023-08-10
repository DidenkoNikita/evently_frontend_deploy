'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import css from './page.module.css';
import { SettingsHeader } from "@/components/SettingsHeader/SettingsHeader";
import { Footer } from "@/components/Footer/Footer";
import { useRouter } from "next/navigation";
import { RightIcon } from "@/components/icons/rightIcon.icon";
import { Block } from "@/components/icons/block.icon";
import { useEffect } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

i18n.init({
  resources,
  lng: "en"
});

export default function PrivacyPage(): JSX.Element {

  useEffect(() => {
    store.dispatch(userGet());
  }, [])

  const user = useSelector((state: State) => state.user);

  const router = useRouter();

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
    // {
    //   title: i18n.t('date_of_birth'),
    //   type: i18n.t('all')
    // },
    // {
    //   title: i18n.t('gender'),
    //   type: i18n.t('all')
    // },
    // {
    //   title: i18n.t('my_categories'),
    //   type: i18n.t('all')
    // },
    // {
    //   title: i18n.t('my_mood'),
    //   type: i18n.t('all')
    // },
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
    <div className={css.wrapper}>
      <SettingsHeader
        title={i18n.t('privacy')}
      />
      <div className={css.container}>
        <div className={css.blackList}>
          <div className={css.wrap}>
            <div className={css.icon}>
              <Block />
            </div>
            <div className={css.text}>
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
          <div className={css.confidentiality}>
            {i18n.t('confidentiality')}
          </div>
          <div className={css.confidentialityWrapper}>
            <div>
              <div className={css.element}>
                <div className={css.text}>
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
              <div className={css.line} />
            </div>
            {
              arr.map((element, index) => {
                return (
                  <div key={index}>
                    <div className={css.element}>
                      <div className={css.text}>
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
                    <div className={css.line} />
                  </div>
                )
              })
            }
            <div className={css.element}>
              <div className={css.text}>
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
          className={css.save}
          onClick={() => {
            router.back();
          }}
        >
          {i18n.t('save')}
        </button>
      </div>
      <Footer />
    </div>
  )
}