'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import i18n from "i18next";

import { store } from '@/store/store';
import resources from "@/locales/resource";
import { createMessage } from '@/store/actions/createMessage';

import { Plus } from '../icons/plus.icon';
import { Send } from '../icons/send.icon';

import css from './FooterChat.module.css';

i18n.init({
  resources,
  lng: "en"
});

interface Data {
  id: number;
  theme: boolean;
  chatId: number | null;
}

export const FooterChat = ({
  id,
  theme,
  chatId
}: Data): JSX.Element => {
  const [inputData, setInputData] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('');

  useEffect((): void => {
    const idUser = JSON.parse(sessionStorage.getItem('user_id') || '');
    setUserId(idUser)
  }, [userId])

  const changeInputData = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputData(e.target.value);
  }

  const handleMessage = (id: number, inputData: string, chatId: number | null): null | undefined => {
    if (inputData.trim() === '') {
      return null
    } else {
      store.dispatch(createMessage(id, inputData, chatId, null));
      setInputData('');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleMessage(id, inputData, chatId)
    }
  };

  return (
    <div className={theme ? css.darkFooterWrapper : css.footerWrapper}>
      <div className={css.wrapper}>
        <button className={css.plus}>
          <Plus color={theme ? '#FFFFFF' : '#000000'} />
        </button>
        <div className={theme ? css.darkInputWrapper : css.inputWrapper}>
          <input
            type="text"
            value={inputData}
            onKeyDown={handleKeyDown}
            onChange={changeInputData}
            placeholder={i18n.t('type_your_message')}
            className={theme ? css.darkInput : css.input}
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