import i18n from "i18next";

import resources from "@/locales/resource";

import css from './LoadingTextFirst.module.css';

i18n.init({
  resources,
  lng: "en"
});

export const LoadingTextFirst = (): JSX.Element => {
  return (
    <div className={css.text}>
      {i18n.t('loading1')}
    </div>
  )
}