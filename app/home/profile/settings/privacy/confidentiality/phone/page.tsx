'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { ConfidentialityComponent } from "@/components/ConfidentialityComponent/ConfidentialityComponent";

i18n.init({
  resources,
  lng: "en"
});

export default function ConfidentialityPhone(): JSX.Element {
  return (
    <div>
      <ConfidentialityComponent 
        title={i18n.t('who_phone_number')}
      />
    </div>
  )
}