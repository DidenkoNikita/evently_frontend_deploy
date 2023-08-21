'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import css from './History.module.css';

interface Story {
  id: number;
  link: string;
  title: string;
}

interface Props {
  theme: boolean;
}

export const History = ({ theme }: Props): JSX.Element => {
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    const API_URL = process.env.API_URL;

    try {
      const response: Response = await fetch(`${API_URL}stories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setStories(data)
    } catch (e) {
      return console.log(e);
    }
  };

  useEffect(() => {
    getStories()
  }, [])

  return (
    <div className={theme ? css.darkHistoryWrapper : css.historyWrapper}>
      {
        stories.map((story: Story) => {
          return (
            <div
              className={css.history}
              key={story.id}
            >
              <div className={css.preview}>
                <Image
                  src={story.link}
                  alt='History'
                  width={66}
                  height={66}
                  className={theme ? css.darkImageHistory : css.imageHistory}
                />
              </div>
              <div
                className={theme ? css.darkTitle : css.title}
              >
                {story.title}
              </div>
            </div>

          )
        })
      }
    </div>
  )
}