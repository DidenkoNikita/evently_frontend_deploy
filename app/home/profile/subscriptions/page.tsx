'use client';

import { Footer } from "@/components/Footer/Footer";
import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";
import i18n from "i18next";

import resources from "@/locales/resource";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";
import { useEffect, useState } from "react";

import css from './page.module.css';
import { store } from "@/store/store";
import { State } from "@/store/initialState";
import { getSubscriptions } from "@/store/actions/getSubscription";
import { useSelector } from "react-redux";
import { SubscriptionComponent } from "@/components/SubscriptionComponent/SubscriptionComponent";

i18n.init({
  resources,
  lng: "en"
});

export default function SubscriptionsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    store.dispatch(getSubscriptions());
  }, []);

  const subscriptions = useSelector((state: State) => state.subscription);

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <HeaderProfileFriend 
        title={i18n.t('subscriptions')}
      />
      <div className={css.search}>
        <SearchComponent 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className={css.subscriptionsList}>
        {
          filteredSubscriptions.map((subscription, index) => {
            return (
              <SubscriptionComponent 
                key={index}
                subscription={subscription}
              />
            )
          })
        }
      </div>
      <Footer />
    </div>
  )
}