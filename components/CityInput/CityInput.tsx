import { useState, useEffect, useRef } from 'react';

import { Up } from '../icons/up.icon';
import { City } from '../icons/city.icon';
import { cityList } from '@/requests/cityList';
import { ArrowToDown } from '../icons/arrowToDown.icon';

import css from './CityInput.module.css';

interface CityData {
  name: string;
}

interface City {
  city: string;
  userTheme: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

export const CityInput = ({
  city,
  setCity,
  userTheme,
}: City) => {
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [allCities, setAllCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);

  useEffect((): void => {
    const fetchCities = async () => {
      try {
        const citiesData = await cityList();
        setAllCities(citiesData);
      } catch (e) {
        return console.log(e);
      }
    };
    fetchCities();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCity(value);
    filterCities(value);
  };

  const filterCities = (value: string): void => {
    const filtered = allCities.filter((city: CityData) =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (city: CityData): void => {
    setCity(city.name);
    setFilteredCities([]);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (
      listRef.current &&
      !listRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setFilteredCities([]);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenList = (): void => {
    setCity('');
    setFilteredCities(allCities);
    setIsOpen(true);
  };

  return (
    <div className={css.wrapper}>
      <div className={userTheme === 'dark' ? css.darkInputWrapper : css.inputWrapper}>
        <City color='#BB83FF' />
        <input
          type="text"
          value={city}
          ref={inputRef}
          placeholder="City"
          onFocus={() => {
            setIsOpen(true);
            filterCities(city);
          }}
          onChange={handleInputChange}
          className={userTheme === 'dark' ? css.darkInput : css.input}
        />
        <button
          className={css.button}
          onClick={handleOpenList}
        >
          {isOpen ? <Up /> : <ArrowToDown />}
        </button>
      </div>
      {!isOpen || filteredCities.length === 0 ? (
        <div />
      ) : (
        <ul
          ref={listRef}
          className={userTheme === 'dark' ? css.darkCityList : css.cityList}
        >
          {filteredCities.map((city: CityData, index) => (
            <li
              key={index}
              className={userTheme === 'dark' ? css.darkCity : css.city}
              onClick={() => handleCitySelect(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
