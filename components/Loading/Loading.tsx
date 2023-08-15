'use client';

import { useEffect, useState } from 'react';

import { store } from '@/store/store';
import { useSelector } from 'react-redux';
import { State } from '@/store/initialState';
import { User } from '@/store/counter/userSlice';
import { userGet } from '@/store/actions/getUser';

import { Loading2 } from '../icons/loading2.icon';
import { Loading3 } from '../icons/loading3.icon';
import { Loading4 } from '../icons/loading4.icon';
import { Loading5 } from '../icons/loading5.icon';
import { Loading6 } from '../icons/loading6.icon';
import { Loading7 } from '../icons/loading7.icon';
import { Loading8 } from '../icons/loading8.icon';
import { LoadingIcon } from '../icons/loadingInitial.icon';
import { LoadingTextFirst } from '../LoadingTextFirst/LoadingTextFirst';
import { LoadingTextThird } from '../LoadingTextThird/LoadingTextThird';
import { LoadingTextSecond } from '../LoadingTextSecond/LoadingTextSecond';

import css from './Loading.module.css';

const loadingComponents: JSX.Element[] = [
  <LoadingIcon key={0} />,
  <Loading2 key={1} />,
  <Loading3 key={2} />,
  <Loading4 key={3} />,
  <Loading5 key={4} />,
  <Loading6 key={5} />,
  <Loading7 key={6} />,
  <Loading8 key={7} />,
];

const loadingText: JSX.Element[] = [
  <LoadingTextFirst key={0} />,
  <LoadingTextSecond key={1} />,
  <LoadingTextThird key={2} />
]

export const LoadingComponent = (): JSX.Element => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % loadingComponents.length);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingText.length);
    }, 500);

    return () => clearInterval(interval)
  }, [])

  useEffect((): void => {
    store.dispatch(userGet());
  }, [])

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;
  
  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div className={css.animation}>
        {loadingComponents[currentComponentIndex]}
      </div>
      <div>
        {loadingText[currentTextIndex]}
      </div>
    </div>
  );
};