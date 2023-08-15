'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "../Footer/Footer";
import { DatePicker } from "../Calendar/Calendar";
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";

import css from './ChooseDate.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
  setStateDate: React.Dispatch<React.SetStateAction<string>>;
  setActiveCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseDate = ({ 
  theme,
  setStateDate, 
  setActiveCalendar, 
}: Props): JSX.Element => {

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderFilter
        title={i18n.t('date_title')}
        filterBrands={[]}
        setStateFilter={setActiveCalendar}
      />
      <DatePicker
        userTheme=""
        color={true}
        openCalendar={true}
        setOpenCalendar={setActiveCalendar}
        setStateDate={setStateDate}
      />
      <Footer />
    </div>
  )
}