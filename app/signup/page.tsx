'use client'

import { Back } from "@/components/icons/back.icon";

import eyes from '../../public/Eyes.gif'

import css from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { CustomStepper } from "@/components/CustomStepper/CustomStepper";
import { ButtonNext } from "@/components/ButtonNext/ButtonNext";
import { EnterPhoneNumber } from "@/components/EnterPhoneNumber/EnterPhoneNumber";
import { WrapperButtons } from "@/components/WrapperButtons/WrapperButtons";
import { ProfileDetails } from "@/components/ProfileDetails/ProfileDetails";
import { CreatePassword } from "@/components/CreatePassword/CreatePassword";
import { Choose } from "@/components/Choose/Choose";
import { ButtonNextRequest } from "@/components/ButtonNextRequest/ButtonNextRequest";
import i18n from "i18next";

import resources from "@/locales/resource";

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

  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [stateInputPhone, setStateInputPhone] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [stateDate, setStateDate] = useState<string>('');
  const [stateGender, setStateGender] = useState<string>('');
  const [statePassword, setStatePassword] = useState<string>('');
  const [stateVerificationPassword, setStateVerificationPassword] = useState<string>('');
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);  

  const [userCategories, setUserCategories] = useState<{ [key: string]: boolean }>({});
  const [userMood, setUserMood] = useState<{ [key: string]: boolean }>({});

  const [userCity, setUserCity] = useState<string>('');

  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const [activeButtonsCity, setActiveButtonsCity] = useState<string[]>([]); 
  
  const user = {
    user: {
      phone: `+${stateInputPhone}`,
      name: stateName,
      date_of_birth: stateDate,
      gender: stateGender,
      password: statePassword,
      city: userCity
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
          stateInputPhone={stateInputPhone}
          setStateInputPhone={setStateInputPhone}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          openCalendar={openCalendar}
        />
      )
    }

    if (activeStep === 2) {
      return (
        <ProfileDetails
          stateName={stateName}
          stateDate={stateDate}
          stateGender={stateGender}
          setStateName={setStateName}
          setStateDate={setStateDate}
          setStateGender={setStateGender}
          openCalendar={openCalendar}
          setOpenCalendar={setOpenCalendar}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )
    }

    if (activeStep === 3) {
      return (
        <CreatePassword
          click={click}
          openCalendar={openCalendar}
          activeStep={activeStep}
          setClick={setClick}
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
          words={categories} 
          header={headerCategories}
          user={user}
          userData={userCategories}
          setUser={setUserCategories}
          activeButtons={activeButtons}
          setActiveButtons={setActiveButtons}
          click={click}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          openCalendar={openCalendar}
        />
      )
    }

    if (activeStep === 5) {
      return (
        <Choose 
          words={mood} 
          header={headerMood} 
          user={user}
          userData={userMood}
          setUser={setUserMood}
          activeButtons={activeButtons}
          setActiveButtons={setActiveButtons}
          click={click}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          openCalendar={openCalendar}
        />
      )
    }

    if (activeStep === 6) {
      return (
        <div>
          <Choose 
            words={city} 
            header={headerCity} 
            user={user}
            userData={userCity}
            setUser={setUserCity}
            activeButtons={activeButtonsCity}
            setActiveButtons={setActiveButtonsCity}
            click={click}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            openCalendar={openCalendar}
          />
        </div>
      )
    }
  }

    return (
      <div className={css.wrapper}>
        <div className={css.header}>
          {openCalendar ? (
            <button className={css.buttonBack} >
              <Back />
            </button>
          ) : (
            <>
              {activeStep === 1 ? (
                <button className={css.buttonBack} onClick={() => router.back()}>
                  <Back />
                </button>
              ) : (
                <button
                  className={css.buttonBack}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  <Back />
                </button>
              )}
            </>
          )}
          <div className={css.title}>{i18n.t('sign_up')}</div>
        </div>
        <div className={css.signupWrapper}>
          <Image
            src={eyes}
            alt='eyes'
            width='215'
            height='84'
          />
          <CustomStepper activeStep={activeStep} />
          {
            registration(activeStep)
          }
        </div>
      </div>
    )
  }