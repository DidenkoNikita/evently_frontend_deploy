'use client';

import { useEffect, useState } from "react";

import i18n from "i18next";
import { useSelector } from "react-redux";

import { store } from "@/store/store";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { Subscription } from "@/store/counter/subscriptionSlice";
import { getSubscriptions } from "@/store/actions/getSubscription";

import { Footer } from "@/components/Footer/Footer";
import { SearchComponent } from "@/components/SearchComponent/SearchComponent";
import { HeaderProfileFriend } from "@/components/HeaderProfileFriend/HeaderProfileFriend";
import { SubscriptionComponent } from "@/components/SubscriptionComponent/SubscriptionComponent";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function SubscriptionsPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect((): void => {
    store.dispatch(userGet());
    store.dispatch(getSubscriptions());
  }, [])

  const subscriptions: Subscription[] = useSelector((state: State) => state.subscription);
  const filteredSubscriptions: Subscription[] = subscriptions.filter((subscription) =>
    subscription.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <HeaderProfileFriend
        theme={theme}
        title={i18n.t('subscriptions')}
      />
      <div className={css.search}>
        <SearchComponent
          theme={theme}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className={css.subscriptionsList}>
        {
          filteredSubscriptions.map((subscription, index) => (
            <SubscriptionComponent
              key={index}
              theme={theme}
              subscription={subscription}
            />
          ))
        }
      </div>
      <Footer />
    </div>
  )
}