'use client';

import { useRouter } from 'next/navigation';

import { ChatsIcon } from '../icons/chats.icon';
import { Subscription } from '@/store/counter/subscriptionSlice';

import css from './SubscriptionComponent.module.css';

interface Props {
  theme: boolean;
  subscription: Subscription;
}

export const SubscriptionComponent = ({
  theme,
  subscription
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <div>
      <div className={css.wrapper}>
        <button
          className={css.container}
          onClick={() => {
            router.push(`/home/services/${subscription.type}/${subscription.brand_id}`)
          }}
        >
          <img
            className={css.avatar}
            src={subscription.link_photo}
          />
          <div className={css.wrapperData}>
            <div className={theme ? css.darkName : css.name}>
              {subscription.name}
            </div>
            <div className={theme ? css.darkType : css.type}>
              {`${subscription.type[0].toUpperCase()}${subscription.type.slice(1)}`}
            </div>
          </div>
        </button>
        <button
          className={css.button}
          onClick={() => {
            router.push('/chats')
          }}
        >
          <ChatsIcon color='#000000' />
        </button>
      </div>
      <div className={theme ? css.darkLine : css.line} />
    </div>
  )
}