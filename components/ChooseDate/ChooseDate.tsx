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
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";

interface Props {
  setActiveCalendar: any;
  setStateDate: any;
  theme: boolean;
}

export const ChooseDate = ({ setActiveCalendar, setStateDate, theme}: Props): JSX.Element => {

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
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