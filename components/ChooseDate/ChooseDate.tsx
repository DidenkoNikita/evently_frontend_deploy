'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

import css from './ChooseDate.module.css';
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";
import { Footer } from "../Footer/Footer";
import { DatePicker } from "../Calendar/Calendar";

interface Props {
  setActiveCalendar: any;
  setStateDate: any;
}

export const ChooseDate = ({ setActiveCalendar, setStateDate}: Props): JSX.Element => {
  return (
    <div className={css.wrapper}>
      <HeaderFilter
        title={i18n.t('date_title')}
        filterBrands={[]}
        setStateFilter={setActiveCalendar}
      />
      <DatePicker
        color={true}
        openCalendar={true}
        setOpenCalendar={setActiveCalendar}
        setStateDate={setStateDate}
      />
      <Footer />
    </div>
  )
}