import i18n from "i18next";

import resources from "@/locales/resource";

import css from './LoadingTextThird.module.css';

i18n.init({
  resources,
  lng: "en"
});

export const LoadingTextThird = (): JSX.Element => {
  return (
    <div className={css.text}>
      {i18n.t('loading3')}
    </div>
  )
}