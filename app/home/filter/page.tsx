'use client';

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

import { City } from "@/components/icons/city.icon";
import { Footer } from "@/components/Footer/Footer";
import { Calendar } from "@/components/icons/calendar.icon";
import { ChooseCity } from "@/components/ChooseCity/ChooseCity";
import { ChooseDate } from "@/components/ChooseDate/ChooseDate";
import { HeaderFilter } from "@/components/HeaderFilter/HeaderFilter";
import { ForwardButton } from "@/components/icons/forwardButton.icon";
import { BrandsResultes } from "@/components/BrandsResultes/BrandsResultes";
import { ChooseCategories } from "@/components/ChooseCategories/ChooseCategories";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function FilterPage(): JSX.Element {
  const [age, setAge] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [userCity, setUserCity] = useState<string>('');
  const [stateDate, setStateDate] = useState<string>('');
  const [filterAge, setFilterAge] = useState<string>('0+');
  const [activeCity, setActiveCity] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [activeCalendar, setActiveCalendar] = useState<boolean>(false);
  const [activeCategories, setActiveCategories] = useState<boolean>(false);
  const [filterHours, setFilterHours] = useState<string>(i18n.t('morning'));
  const [userCategories, setUserCategories] = useState<{ [key: string]: boolean }>({});

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(brandGet());
  }, [])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  const defaultCity: string = user?.user?.city;

  const brands: Brand[] = useSelector((state: State) => state.brand);
  const filterBrands: Brand[] = brands.filter((brand): boolean => {
    return (
      brand.category === filterCategory &&
      brand.hours === filterHours &&
      brand.age === filterAge &&
      brand.date === stateDate &&
      (userCity !== '' ? brand.city === userCity : brand.city === defaultCity)
    )
  })

  const businessHoursArr: string[] = [
    i18n.t('morning'),
    i18n.t('afternoon'),
    i18n.t('evening'),
    i18n.t('night')
  ]

  const ageArr: string[] = ['0+', '10+', '16+', '18+'];

  let content: JSX.Element | null = null;

  switch (true) {
    case activeCity:
      content = (
        <ChooseCity
          theme={theme}
          userCity={userCity}
          setUserCity={setUserCity}
          activeCity={activeCity}
          setActiveCity={setActiveCity}
        />
      );
      break;
    case activeCategories:
      content = (
        <ChooseCategories
          theme={theme}
          userCategories={userCategories}
          setUserCategories={setUserCategories}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          setFilterCategory={setFilterCategory}
        />
      );
      break;
    case activeCalendar:
      content = (
        <ChooseDate
          theme={theme}
          setActiveCalendar={setActiveCalendar}
          setStateDate={setStateDate}
        />
      )
      break;
    case stateFilter:
      content = (
        <BrandsResultes
          theme={theme}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          filterBrands={filterBrands}
        />
      );
      break;
    default:
      content = (
        <div className={theme ? css.darkContainer : css.container}>
          <HeaderFilter
            title={i18n.t('filter')}
            setStateFilter={null}
            filterBrands={[]}
          />
          <div className={css.wrapper}>
            <div className={theme ? css.darkCard : css.card}>
              <div className={css.dataWrapper}>
                <City color='#BB83FF' />
                <div className={theme ? css.darkText : css.text}>
                  {userCity === '' ? defaultCity : userCity}
                </div>
              </div>
              <button
                className={theme ? css.darkIconButton : css.iconButton}
                onClick={() => {
                  setActiveCity(!activeCity);
                }}
              >
                <ForwardButton />
              </button>
            </div>
            <div className={theme ? css.darkCard : css.card}>
              <div className={css.dataWrapper}>
                <Calendar />
                <div className={theme ? css.darkText : css.text}>
                  {stateDate !== '' ? stateDate : i18n.t('date_format')}
                </div>
              </div>
              <button
                className={theme ? css.darkIconButton : css.iconButton}
                onClick={() => {
                  setActiveCalendar(!activeCalendar)
                }}
              >
                <ForwardButton />
              </button>
            </div>
            <div className={theme ? css.darkCard : css.card}>
              <div className={css.dataWrapper}>
                <div className={theme ? css.darkText : css.text}>
                  {i18n.t('categories')}
                </div>
              </div>
              <button
                className={theme ? css.darkIconButton : css.iconButton}
                onClick={() => {
                  setActiveCategories(!activeCategories);
                }}
              >
                <ForwardButton />
              </button>
            </div>
            <div className={css.wrapperButtons}>
              <div className={theme ? css.darkTitle : css.title}>
                {i18n.t('Business hours')}
              </div>
              <div className={css.buttons}>
                {
                  businessHoursArr.map((element, index) => (
                    <button
                      key={index}
                      className={hours === index ? css.activeButton : (theme ? css.darkButton : css.button)}
                      onClick={() => {
                        setHours(index);
                        setFilterHours(element);
                      }}
                    >
                      {element}
                    </button>
                  ))
                }
              </div>
            </div>
            <div className={css.wrapperButtons}>
              <div className={theme ? css.darkTitle : css.title}>
                {i18n.t('price')}
              </div>
              <div className={css.priceWrapper}>
                <div className={theme ? css.darkPriceCard : css.priceCard}>
                  <div className={css.titlePrice}>
                    {i18n.t('from')}
                  </div>
                  <div className={theme ? css.darkText : css.text}>
                    0
                  </div>
                </div>
                <div className={theme ? css.darkPriceCard : css.priceCard}>
                  <div className={css.titlePrice}>
                    {i18n.t('to')}
                  </div>
                  <div className={theme ? css.darkText : css.text}>
                    500000
                  </div>
                </div>
              </div>
              <div className={css.slider}>
                <div className={css.circle} />
                <div className={css.line} />
                <div className={css.circle} />
              </div>
            </div>
            <div className={css.wrapperButtons}>
              <div className={theme ? css.darkTitle : css.title}>
                {i18n.t('age')}
              </div>
              <div className={css.buttons}>
                {
                  ageArr.map((element, index) => {
                    return (
                      <button
                        key={index}
                        className={age === index ? css.activeButton : (theme ? css.darkButton : css.button)}
                        onClick={() => {
                          setAge(index);
                          setFilterAge(element);
                        }}
                      >
                        {element}
                      </button>
                    )
                  })
                }
              </div>
            </div>
            <button
              className={css.buttonOk}
              onClick={() => {
                setStateFilter(!stateFilter);
              }}
            >
              {i18n.t('ok')}
            </button>
          </div>
          <Footer />
        </div>
      );
  }
  return <div>{content}</div>;
}
