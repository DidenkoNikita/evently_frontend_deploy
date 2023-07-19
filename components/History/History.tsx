'use client';

import css from './History.module.css';

import { useEffect, useState } from 'react';

interface Story {
  id: number;
  title: string;
  link: string;
}

export const History = (): JSX.Element => {
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
    <div className={css.historyWrapper}>
      {
        stories.map((story: Story) => {
          return (
            <div 
              className={css.history}
              key={story.id}
            >
              <div className={css.preview}>
                <img
                  src={story.link}
                  alt='History'
                  width={66}
                  height={66}
                  className={css.imageHistory}
                />
              </div>
              <div className={css.title}>{story.title}</div>
            </div>        

          )
        })
      }
    </div>
  )
}