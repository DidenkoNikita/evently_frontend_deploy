'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import i18n from "i18next";

import eyes from '../../public/Eyes.gif';
import resources from "@/locales/resource";

import { Back } from "@/components/icons/back.icon";
import { Choose } from "@/components/Choose/Choose";
import { CustomStepper } from "@/components/CustomStepper/CustomStepper";
import { ProfileDetails } from "@/components/ProfileDetails/ProfileDetails";
import { CreatePassword } from "@/components/CreatePassword/CreatePassword";
import { EnterPhoneNumber } from "@/components/EnterPhoneNumber/EnterPhoneNumber";

import css from "./page.module.css";

i18n.init({
  resources,
  lng: "en"
});

export interface User {
  user: {
    phone: string;
    name: string;
    date_of_birth: string
    gender: string;
    password: string;
    city: string;
    color_theme: boolean;
  },
  user_categories: {
    restaurants?: string;
    trade_fairs?: string;
    lectures?: string;
    cafe?: string;
    bars?: string;
    sport?: string;
    dancing?: string;
    games?: string;
    quests?: string;
    concerts?: string;
    parties?: string;
    show?: string;
    for_free?: string;
    cinema?: string;
    theaters?: string;
  },
  user_mood: {
    funny?: string;
    sad?: string;
    gambling?: string;
    romantic?: string;
    energetic?: string;
    festive?: string;
    calm?: string;
    friendly?: string;
    cognitive?: string;
    dreamy?: string;
    do_not_know?: string;
  }
}

export default function Signup(): JSX.Element {
  const [click, setClick] = useState<boolean>(false);
  const [userCity, setUserCity] = useState<string>('');
  const [stateDate, setStateDate] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [stateGender, setStateGender] = useState<string>('');
  const [userTheme, setUserTheme] = useState<string>('light');
  const [statePassword, setStatePassword] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [stateInputPhone, setStateInputPhone] = useState<string>('');
  const [activeButtonsCity, setActiveButtonsCity] = useState<string[]>([]);
  const [userMood, setUserMood] = useState<{ [key: string]: boolean }>({});
  const [userCategories, setUserCategories] = useState<{ [key: string]: boolean }>({});
  const [stateVerificationPassword, setStateVerificationPassword] = useState<string>('');

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setUserTheme(e.matches ? 'dark' : 'light');
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);
    setUserTheme(darkModeMediaQuery.matches ? 'dark' : 'light');
    return () => darkModeMediaQuery.removeListener(handleDarkModeChange);
  }, []);

  const router = useRouter();

  const user: User = {
    user: {
      phone: `${stateInputPhone}`,
      name: stateName,
      date_of_birth: stateDate,
      gender: stateGender,
      password: statePassword,
      city: userCity,
      color_theme: userTheme === 'dark' ? true : false
    },
    user_categories: {
      ...userCategories
    },
    user_mood: {
      ...userMood
    }
  }

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

  const headerCategories: string = i18n.t('choose_categories');

  const mood: string[] = [
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

  const headerMood: string = i18n.t('chose_mood');

  const city: string[] = [
    i18n.t('saint_petersburg'),
    i18n.t('moscow'),
    i18n.t('kazan'),
    i18n.t('kemerovo'),
    i18n.t('barnaul'),
    i18n.t('arkhangelsk'),
    i18n.t('astrakhan'),
    i18n.t('rostov_on_don'),
    i18n.t('belgorod')
  ];

  const headerCity: string = i18n.t('choose_a_sity');

  const registration = (activeStep: number): JSX.Element | undefined => {
    if (activeStep === 1) {
      return (
        <EnterPhoneNumber
          userTheme={userTheme}
          activeStep={activeStep}
          openCalendar={openCalendar}
          setActiveStep={setActiveStep}
          stateInputPhone={stateInputPhone}
          setStateInputPhone={setStateInputPhone}
        />
      )
    }

    if (activeStep === 2) {
      return (
        <ProfileDetails
          userTheme={userTheme}
          stateName={stateName}
          stateDate={stateDate}
          activeStep={activeStep}
          stateGender={stateGender}
          setStateName={setStateName}
          setStateDate={setStateDate}
          openCalendar={openCalendar}
          setActiveStep={setActiveStep}
          setStateGender={setStateGender}
          setOpenCalendar={setOpenCalendar}
        />
      )
    }

    if (activeStep === 3) {
      return (
        <CreatePassword
          click={click}
          setClick={setClick}
          userTheme={userTheme}
          activeStep={activeStep}
          openCalendar={openCalendar}
          setActiveStep={setActiveStep}
          statePassword={statePassword}
          setStatePassword={setStatePassword}
          stateVerificationPassword={stateVerificationPassword}
          setStateVerificationPassword={setStateVerificationPassword}
        />
      )
    }

    if (activeStep === 4) {
      return (
        <Choose
          user={user}
          click={click}
          words={categories}
          userTheme={userTheme}
          activeStep={activeStep}
          header={headerCategories}
          userData={userCategories}
          openCalendar={openCalendar}
          setUser={setUserCategories}
          activeButtons={activeButtons}
          setActiveStep={setActiveStep}
          setActiveButtons={setActiveButtons}
        />
      )
    }

    if (activeStep === 5) {
      return (
        <Choose
          user={user}
          words={mood}
          click={click}
          header={headerMood}
          userData={userMood}
          userTheme={userTheme}
          setUser={setUserMood}
          activeStep={activeStep}
          openCalendar={openCalendar}
          activeButtons={activeButtons}
          setActiveStep={setActiveStep}
          setActiveButtons={setActiveButtons}
        />
      )
    }

    if (activeStep === 6) {
      return (
        <div>
          <Choose
            user={user}
            words={city}
            click={click}
            userData={userCity}
            header={headerCity}
            userTheme={userTheme}
            setUser={setUserCity}
            activeStep={activeStep}
            openCalendar={openCalendar}
            setActiveStep={setActiveStep}
            activeButtons={activeButtonsCity}
            setActiveButtons={setActiveButtonsCity}
          />
        </div>
      )
    }
  }

  return (
    <div className={userTheme === 'dark' ? css.darkWrapper : css.wrapper}>
      <div className={userTheme === 'dark' ? css.darkHeader : css.header}>
        {openCalendar ? (
          <div className={css.buttonBack} />
        ) : (
          <>
            {activeStep === 1 ? (
              <button
                className={css.buttonBack}
                onClick={() => router.back()}
              >
                <Back color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
              </button>
            ) : (
              <button
                className={css.buttonBack}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                <Back color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
              </button>
            )}
          </>
        )}
        <div className={userTheme === 'dark' ? css.darkTitle : css.title}>
          {i18n.t('sign_up')}
        </div>
      </div>
      <div className={css.signupWrapper}>
        <Image
          src={eyes}
          alt='eyes'
          width='215'
          height='84'
        />
        <CustomStepper
          userTheme={userTheme}
          activeStep={activeStep}
        />
        {
          registration(activeStep)
        }
      </div>
    </div>
  )
}