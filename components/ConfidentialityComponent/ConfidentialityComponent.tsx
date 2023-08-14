import { SettingsHeader } from '../SettingsHeader/SettingsHeader';
import css from './ConfidentialityComponent.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Footer } from '../Footer/Footer';
import { useEffect, useState } from 'react';
import { store } from '@/store/store';
import { updateConfidentialityPhone } from '@/store/actions/updateConfidentialityPhone';
import { updateConfidentialityMessages } from '@/store/actions/updateConfidentialityMessages';
import { useRouter } from 'next/navigation';
import { userGet } from '@/store/actions/getUser';
import { useSelector } from 'react-redux';
import { State } from '@/store/initialState';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  title: string;
}

export const ConfidentialityComponent = ({ title }: Props): JSX.Element => {
  const [activeButton, setActiveButton] = useState<number>(0);
  const [stateType, setStateType] = useState<string>('All');

  useEffect(() => {
    store.dispatch(userGet());
  }, [])

  console.log(stateType);

  const router = useRouter();
  
  const user = useSelector((state: State) => state.user);
  const theme = user?.user?.color_theme;

  const arr = [i18n.t('all'), i18n.t('my_friends'), i18n.t('nobody')];

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
              return (
                <div
                  key={index}
                >
                  <div
                    className={css.element}
                  >
                    <div className={theme ? css.darkText : css.text}>
                      {element}
                    </div>
                    <div className={css.buttonWrapper}>
                      <button
                        className={theme ? css.blackButton : css.button}
                        onClick={() => {
                          setActiveButton(index);
                          setStateType(element);
                        }}
                      >
                        {
                          activeButton === index ? <div className={css.curcle} /> : null
                        }
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