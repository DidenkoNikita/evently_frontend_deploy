'use client';

import { HeaderFilter } from "@/components/HeaderFilter/HeaderFilter";
import { City } from "@/components/icons/city.icon";
import { Calendar } from "@/components/icons/calendar.icon";
import { ForwardButton } from "@/components/icons/forwardButton.icon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import i18n from "i18next";
import resources from "@/locales/resource";
import css from './page.module.css';
import { ChooseCity } from "@/components/ChooseCity/ChooseCity";
import { ChooseCategories } from "@/components/ChooseCategories/ChooseCategories";
import { BrandsResultes } from "@/components/BrandsResultes/BrandsResultes";
import { userGet } from "@/store/actions/getUser";
import { State } from "@/store/initialState";
import { Footer } from "@/components/Footer/Footer";
import { ArrowToDown } from "@/components/icons/arrowToDown.icon";
import { store } from "@/store/store";
import { brandGet } from "@/store/actions/getBrand";
import { ChooseDate } from "@/components/ChooseDate/ChooseDate";

i18n.init({
  resources,
  lng: "en"
});

export default function FilterPage(): JSX.Element {
  const [hours, setHours] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [activeCity, setActiveCity] = useState<boolean>(false);
  const [userCategories, setUserCategories] = useState<{ [key: string]: boolean }>({});
  const [activeCategories, setActiveCategories] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<boolean>(false);
  const [activeCalendar, setActiveCalendar] = useState<boolean>(false);

  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterHours, setFilterHours] = useState<string>(i18n.t('morning'));
  const [filterAge, setFilterAge] = useState<string>('0+');
  const [stateDate, setStateDate] = useState<string>('');

  useEffect(() => {
    store.dispatch(userGet());
    store.dispatch(brandGet());
  }, [])

  const user = useSelector((state: State) => state.user);
  const defaultCity = user?.user?.city;
  const [userCity, setUserCity] = useState<string>('');

  const brands = useSelector((state: State) => state.brand);
  const filterBrands = brands.filter((brand) => {
    return (
      brand.category === filterCategory &&
      brand.hours === filterHours &&
      brand.age === filterAge &&
      brand.date === stateDate &&
      (userCity !== '' ? brand.city === userCity : brand.city === defaultCity)
    );
  });

  console.log(filterBrands);
  
  console.log(filterCategory, filterHours, filterAge, stateDate);


  const businessHoursArr = [
    i18n.t('morning'),
    i18n.t('afternoon'),
    i18n.t('evening'),
    i18n.t('night')
  ];

  const ageArr = ['0+', '10+', '16+', '18+'];

  let content = null;

  switch (true) {
    case activeCity:
      content = (
        <ChooseCity
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
          setActiveCalendar={setActiveCalendar}
          setStateDate={setStateDate}
        />
      )
      break;
    case stateFilter:
      content = (
        <BrandsResultes
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          filterBrands={filterBrands}
        />
      );
      break;
    default:
      content = (
        <div className={css.container}>
          <HeaderFilter
            title={i18n.t('filter')}
            setStateFilter={null}
            filterBrands={[]}
          />
          <div className={css.wrapper}>
            <div className={css.card}>
              <div className={css.dataWrapper}>
                <City color="#BB83FF" />
                <div className={css.text}>
                  {userCity === '' ? defaultCity : userCity}
                </div>
              </div>
              <button
                className={css.iconButton}
                onClick={() => {
                  setActiveCity(!activeCity);
                }}
              >
                <ArrowToDown />
              </button>
            </div>
            <div className={css.card}>
              <div className={css.dataWrapper}>
                <Calendar />
                <div className={css.text}>
                  {stateDate !== '' ? stateDate : i18n.t('date_format')}
                </div>
              </div>
              <button 
                className={css.iconButton}
                onClick={() =>  {
                  setActiveCalendar(!activeCalendar)
                }}
              >
                <ArrowToDown />
              </button>
            </div>
            <div className={css.card}>
              <div className={css.dataWrapper}>
                <div className={css.text}>
                  {i18n.t('categories')}
                </div>
              </div>
              <button
                className={css.iconButton}
                onClick={() => {
                  setActiveCategories(!activeCategories);
                }}
              >
                <ForwardButton />
              </button>
            </div>
            <div className={css.wrapperButtons}>
              <div className={css.title}>
                {i18n.t('Business hours')}
              </div>
              <div className={css.buttons}>
                {
                  businessHoursArr.map((element, index) => {
                    return (
                      <button
                        key={index}
                        className={hours === index ? css.activeButton : css.button}
                        onClick={() => {
                          setHours(index);
                          setFilterHours(element);
                        }}
                      >
                        {element}
                      </button>
                    )
                  })
                }
              </div>
            </div>
            <div className={css.wrapperButtons}>
              <div className={css.title}>
                {i18n.t('price')}
              </div>
              <div className={css.priceWrapper}>
                <div className={css.priceCard}>
                  <div className={css.titlePrice}>
                    {i18n.t('from')}
                  </div>
                  <div className={css.text}>
                    0
                  </div>
                </div>
                <div className={css.priceCard}>
                  <div className={css.titlePrice}>
                    {i18n.t('to')}
                  </div>
                  <div className={css.text}>
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
              <div className={css.title}>
                {i18n.t('age')}
              </div>
              <div className={css.buttons}>
                {
                  ageArr.map((element, index) => {
                    return (
                      <button
                        key={index}
                        className={age === index ? css.activeButton : css.button}
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
