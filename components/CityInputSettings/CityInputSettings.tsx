import { useState, useEffect, useRef } from 'react';
import css from './CityInputSettimgs.module.css';
import { City } from '../icons/city.icon';
import { ArrowToDown } from '../icons/arrowToDown.icon';
import { Up } from '../icons/up.icon';
import { cityList } from '@/requests/cityList';

interface CityData {
  name: string;
}

interface City {
  setCity: any;
  city: string;
  color: boolean;
  theme: boolean | null;
}

export const CityInputSettings = ({ setCity, city, color, theme }: City) => {
  const [allCities, setAllCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await cityList();
        setAllCities(citiesData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCities();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    filterCities(value);
  };

  const filterCities = (value: string) => {
    const filtered = allCities.filter((city: CityData) =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCitySelect = (city: CityData) => {
    setCity(city.name);
    setFilteredCities([]);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
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

  const handleOpenList = () => {
    setCity('');
    setFilteredCities(allCities);
    setIsOpen(true);
  };

  return (
    <div className={css.wrapper}>
      <div className={color ? (theme ? css.darkColorInputWrapper : css.colorInputWrapper) : (theme ? css.darkInputWrapper : css.inputWrapper)}>
        <City color='#BB83FF'/>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="City"
          className={color ? (theme ? css.darkColorInput : css.colorInput) : (theme ? css.darkInput : css.input)}
          ref={inputRef}
          onFocus={() => {
            setIsOpen(true);
            filterCities(city);
          }}
        />
        <button className={css.button} onClick={handleOpenList}>
          {isOpen ? <Up /> : <ArrowToDown />}
        </button>
      </div>
      {!isOpen || filteredCities.length === 0 ? (
        <div></div>
      ) : (
        <ul className={color ? (theme ? css.darkColorCityList : css.colorCityList) : (theme ? css.darkCityList : css.cityList)} ref={listRef}>
          {filteredCities.map((city: CityData, index) => (
            <li
              key={index}
              className={theme ? css.darkColorCity : css.city}
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
