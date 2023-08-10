'use client';

import { Subscription } from '@/store/counter/subscriptionSlice';
import css from './SubscriptionComponent.module.css';
import { ChatsIcon } from '../icons/chats.icon';
import { useRouter } from 'next/navigation';

interface Props {
  subscription: Subscription;
}

export const SubscriptionComponent = ({ subscription }: Props): JSX.Element => {

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
            src={subscription.link_photo}
            className={css.avatar}
          />
          <div className={css.wrapperData}>
            <div className={css.name}>
              {subscription.name}
            </div>
            <div className={css.type}>
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
          <ChatsIcon />
        </button>
      </div>
      <div className={css.line} />
    </div>
  )
}