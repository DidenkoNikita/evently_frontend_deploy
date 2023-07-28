'use client';

import { useEffect, useState } from "react";
import { DoubleCheckmark } from "../icons/doubleCheckmark.icon";

import css from './Message.module.css';

interface Message {
  text: string;
  date: string;
  isRead: boolean;
  userId: number
}

export const Message = ({text, date, userId, isRead}: Message): JSX.Element => {
  const [id, setId] = useState<number | string>('');

  const time = new Date(date);

  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setId(Number(userId))
  }, [id]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={userId === id ? css.wrapperMessage : css.receivedWrapperMessage}>
      <div className={css.text}>
        {text}
      </div>
      <div className={css.wrapper}>
        <div className={userId === id ? css.date : css.receivedDate}>{`${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`}</div>
        <div className={css.read}>
          {userId === id ? ( isRead ? <DoubleCheckmark color="#BB83FF" /> : <DoubleCheckmark color="#AAAAAA" />) : null}
        </div>
      </div>
    </div>
  )
}
