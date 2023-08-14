'use client';

import { Add } from '../icons/add.icon';
import { Forward } from '../icons/forward.icon';
import css from './CommentsFooter.module.css';
import i18n from "i18next";

import resources from "@/locales/resource";
import { useEffect, useState } from 'react';
import { store } from '@/store/store';
import { createComment } from '@/store/actions/createComment';

i18n.init({
  resources,
  lng: "en"
});

interface Props {
  theme: boolean;
}

export const CommentsFooter = ({ theme }: Props): JSX.Element => {
  const [stateInput, setStateInput] = useState<string>('');
  const [postId, setPostId] = useState<string>('');

  useEffect(() => {
    setPostId(location.pathname)
  }, [])
  const id: number = Number(postId.slice(20))

  const handleComment = (text: string, id: number) => {
    if (text.trim() === '') {
      return;
    }

    setStateInput('');
    store.dispatch(createComment(text, id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleComment(stateInput, id);
    }
  };
  return (
    <div className={theme ? css.darkFooter : css.footer}>
      <button
        className={theme ? css.darkButton : css.button}
      >
        <Add color={theme ? '#FFFFFF' : '#000000'} />
      </button>
      <div className={theme ? css.darkInputWrapper : css.inputWrapper}>
        <input
          type='text'
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
          className={theme ? css.darkInput : css.input}
          placeholder={i18n.t('comment')}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        onClick={() => handleComment(stateInput, id)}
        className={css.send}
      >
        <Forward color='#000000' />
      </button>
    </div>
  )
}