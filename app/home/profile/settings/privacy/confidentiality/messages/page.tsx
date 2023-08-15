'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { ConfidentialityComponent } from "@/components/ConfidentialityComponent/ConfidentialityComponent";

i18n.init({
  resources,
  lng: "en"
});

export default function ConfidentialityMessages(): JSX.Element {
  return (
    <div>
      <ConfidentialityComponent 
        title={i18n.t('who_messages')}
      />
    </div>
  )
}