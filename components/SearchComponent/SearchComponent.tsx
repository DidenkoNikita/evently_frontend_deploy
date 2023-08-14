import css from './SearchComponent.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { Search } from '../icons/search.icon';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  searchTerm: string;
  setSearchTerm: any;
  theme: boolean;
}

export const SearchComponent = ({searchTerm, setSearchTerm, theme}: Props): JSX.Element => {
  return (
    <div className={theme ? css.darkSearch : css.search}>
      <input
        className={theme ? css.darkInput : css.input}
        placeholder={i18n.t('search2')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={css.icon}>
        <Search />
      </div>
    </div>
  )
} 