'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

i18n.init({
  resources,
  lng: "en"
});

import { ConfidentialityComponent } from "@/components/ConfidentialityComponent/ConfidentialityComponent";

export default function ConfidentialityPhone(): JSX.Element {
  return (
    <div>
      <ConfidentialityComponent 
        title={i18n.t('who_phone_number')}
      />
    </div>
  )
}