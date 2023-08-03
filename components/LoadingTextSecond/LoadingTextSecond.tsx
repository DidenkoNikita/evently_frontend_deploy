import i18n from "i18next";

import resources from "@/locales/resource";

import css from './LoadingTextSecond.module.css';

i18n.init({
  resources,
  lng: "en"
});

export const LoadingTextSecond = (): JSX.Element => {
  return (
    <div className={css.text}>
      {i18n.t('loading2')}
    </div>
  )
}