'use client'

import { Back } from "@/components/icons/back.icon";

import eyes from '../../public/Eyes.png'

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
import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});


export default function Signup(): JSX.Element {

  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [stateInputPhone, setStateInputPhone] = useState<string>(''); 
  const [stateName, setStateName] = useState<string>('');
  const [stateDate, setStateDate] = useState<Date>(new Date());
  const [stateGender, setStateGender] = useState<string>(''); 
  const [statePassword, setStatePassword] = useState<string>('');
  const [stateVerificationPassword, setStateVerificationPassword] = useState<string>('');

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
        />
      )
    }

    if (activeStep === 3) {
      return (
        <CreatePassword 
          statePassword={statePassword}
          setStatePassword={setStatePassword}
          stateVerificationPassword={stateVerificationPassword}
          setStateVerificationPassword={setStateVerificationPassword}
        />
      )
    }

    if (activeStep === 4) {
      return (
        <Choose words={categories} header={headerCategories} />
      )
    }

    if (activeStep === 5) {
      return (
        <Choose words={mood} header={headerMood} />
      )
    }

    if (activeStep === 6) {
      return (
        <Choose words={city} header={headerCity} />
      )
    }
  }

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <button 
          className={css.buttonBack}
          onClick={() => router.back()}
        >
          <Back />
        </button>
        <div className={css.title}>{i18n.t('sign_up')}</div>
      </div>
      <div className={css.signupWrapper}>
        <Image 
          src={eyes}
          alt='eyes'
          width='215'
          height='84'
        />
        <CustomStepper activeStep={activeStep}/>
        { 
          registration(activeStep)
        }
        {activeStep === 1 ? <WrapperButtons activeStep={activeStep} setActiveStep={setActiveStep}/> : <ButtonNext activeStep={activeStep} setActiveStep={setActiveStep}/>}
      </div>
    </div>
  )
}