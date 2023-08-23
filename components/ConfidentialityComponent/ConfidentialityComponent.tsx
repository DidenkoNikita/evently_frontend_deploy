'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import i18n from "i18next";
import { useSelector } from 'react-redux';

import { store } from '@/store/store';
import resources from "@/locales/resource";
import { State } from '@/store/initialState';
import { User } from '@/store/counter/userSlice';
import { userGet } from '@/store/actions/getUser';
import { LoadingComponent } from '../Loading/Loading';
import { updateConfidentialityPhone } from '@/store/actions/updateConfidentialityPhone';
import { updateConfidentialityMessages } from '@/store/actions/updateConfidentialityMessages';

import { Footer } from '../Footer/Footer';
import { SettingsHeader } from '../SettingsHeader/SettingsHeader';

import css from './ConfidentialityComponent.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  title: string;
}

interface Confidentiality {
  all: boolean;
  my_friends: boolean;
  nobody: boolean;
}

export const ConfidentialityComponent = ({ title }: Props): JSX.Element => {
  const [stateType, setStateType] = useState<string>('All');
  
  useEffect((): void => {
    store.dispatch(userGet());
  }, [])
  
  const router = useRouter();
  
  const user: User = useSelector((state: State) => state.user);
  
  const [activeButtons, setActiveButtons] = useState<boolean[]>(
    title === i18n.t('who_phone_number') ? (
      [user?.phoneConfidentiality?.all, user?.phoneConfidentiality?.my_friends, user?.phoneConfidentiality?.nobody]
    ) : (
      [user?.messageConfidentiality?.all, user?.messageConfidentiality?.my_friends, user?.messageConfidentiality?.nobody]
    )
  );
  const theme: boolean = user?.user?.color_theme;

  const arr: string[] = [i18n.t('all'), i18n.t('my_friends'), i18n.t('nobody')];

  if (user.phoneConfidentiality === undefined || user.messageConfidentiality === undefined) {
    return (
      <div className={css.loading}>
        <LoadingComponent />
      </div>
    )
  }

  const handleButtonClick = (index: number): void => {
    setActiveButtons(prevState => prevState.map((value, idx) => idx === index));
    setStateType(arr[index]);
  };

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <SettingsHeader
        theme={theme}
        title={i18n.t('confidentiality')}
      />
      <div className={css.container}>
        <div className={theme ? css.darkTitle : css.title}>
          {title}
        </div>
        <div className={theme ? css.darkWrap : css.wrap}>
          {
            arr.map((element, index) => {
              const normalizedWord = element.replace(/\s/g, '_').toLowerCase();
              title === i18n.t('who_phone_number')
                ? user?.phoneConfidentiality[normalizedWord as keyof Confidentiality]
                : user?.messageConfidentiality[normalizedWord as keyof Confidentiality];

              return (
                <div key={index}>
                  <div className={css.element}>
                    <div className={theme ? css.darkText : css.text}>
                      {element}
                    </div>
                    <div className={css.buttonWrapper}>
                      <button
                        onClick={() => handleButtonClick(index)}
                        className={theme ? css.blackButton : css.button}
                      >
                        {activeButtons[index] ? <div className={css.curcle} /> : null}
                      </button>
                    </div>
                  </div>
                  {
                    index === 2 ? null : <div className={theme ? css.darkLine : css.line} />
                  }
                </div>
              )
            })
          }
        </div>
        <button
          className={css.save}
          onClick={() => {
            if (title === i18n.t('who_phone_number')) {
              store.dispatch(updateConfidentialityPhone(stateType))
            } else {
              store.dispatch(updateConfidentialityMessages(stateType))
            }
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