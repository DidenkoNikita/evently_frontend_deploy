'use client';

import { Plus } from '../icons/plus.icon';
import { Send } from '../icons/send.icon';
import css from './FooterChat.module.css';

import i18n from "i18next";

import resources from "@/locales/resource";
import { ChangeEvent, useEffect, useState } from 'react';
import { store } from '@/store/store';
import { createMessage } from '@/store/actions/createMessage';
import { socket } from '@/utils/socket';

i18n.init({
  resources,
  lng: "en"
});

interface Data {
  id: number;
  chatId: number | null;
}

export const FooterChat = ({id, chatId}: Data): JSX.Element => {
  const [inputData, setInputData] = useState<string>('');

  const [userId, setUserId] = useState<number | string>('');

  useEffect(() => {
    const idUser = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(idUser)
  }, [userId])

  const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  }

  const handleMessage = (id: number, inputData: string, chatId: number | null) => {
    if (inputData.trim() === '') {
      return null
    } else {
      store.dispatch(createMessage(id, inputData, chatId));
      setInputData('');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessage(id, inputData, chatId)
    }
  };

  return (
    <div
      className={css.footerWrapper}
    >
      <div className={css.wrapper}>
        <button className={css.plus}>
          <Plus />
        </button>
        <div className={css.inputWrapper}>
          <input 
            type="text" 
            className={css.input}
            placeholder={i18n.t('type_your_message')}
            value={inputData}
            onChange={changeInputData}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button 
          className={css.send}
          onClick={() => {
            handleMessage(id, inputData, chatId)
          }}
        >
          <Send />
        </button>
      </div>
    </div>
  )
}