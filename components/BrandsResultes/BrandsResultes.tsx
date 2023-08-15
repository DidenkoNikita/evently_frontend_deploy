import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "../Footer/Footer";
import { Brand } from "@/store/counter/brandSlice";
import { HeaderFilter } from "../HeaderFilter/HeaderFilter";
import { BrandComponent } from "../BrandComponent/BrandComponent";

import css from './BrandsResultes.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  stateFilter: boolean;
  setStateFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterBrands: Brand[] | [];
  theme: boolean;
}

export const BrandsResultes = ({ 
  theme,
  filterBrands, 
  setStateFilter
}: Props): JSX.Element => {
  return (
    <div className={theme ? css.darkContainer : css.container}>
      <HeaderFilter
        title={i18n.t('brand_resultes')}
        setStateFilter={setStateFilter}
        filterBrands={filterBrands}
      />
      <div className={css.wrapper}>
        {
          filterBrands.map((brand, index) => {
            return (
              <BrandComponent
                key={index}
                brand={brand}
                link={`/home/services/${brand.type}`}
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}