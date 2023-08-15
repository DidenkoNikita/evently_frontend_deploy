'use client'

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { Brand } from "@/store/counter/brandSlice";
import { brandGet } from "@/store/actions/getBrand";

import { Footer } from "@/components/Footer/Footer";
import { HeaderBrand } from "@/components/HeaderBrand/HeaderBrand";
import { BrandComponent } from "@/components/BrandComponent/BrandComponent";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";
import { CalendarOfEventsHome } from "@/components/CalendarOfEventsHome/CalendarOfEventsHome";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function CafePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    store.dispatch(userGet());
    store.dispatch(brandGet());
  }, [])

  const brands: Brand[] = useSelector((state: State) => state.brand);
  const filterBrands: Brand[] = brands.filter((brand) => brand.type === 'cafe');
  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderBrand
        theme={theme}
        title={i18n.t('calendar_of_events')}
      />
      <SearchComponent
        theme={theme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className={css.calendar}>
        <CalendarOfEventsHome />
      </div>
      <div className={css.wrapperBrands}>
        {
          filterBrands.map((brand, index) => {
            return (
              <BrandComponent
                key={index}
                brand={brand}
                link='/home/services/cafe'
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}