import { useState } from 'react';
import css from './Choose.module.css';

interface Words {
  words: string[];
  header: string;
}

export const Choose = ({words, header}: Words): JSX.Element => {

  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const handleButtonClick = (word: string) => {
    if (activeButtons.includes(word)) {
      setActiveButtons(activeButtons.filter((button) => button !== word));
    } else {
      setActiveButtons([...activeButtons, word]);
    }
  };
  
  return (
    <div className={css.wrapper}>
      <div className={css.header}>{header}</div>
      <div className={css.buttonsWrapper}>
        {
          words.map((word) => {
            return (
              <button 
                key={word}
                className={activeButtons.includes(word) === false ? css.button : css.buttonActive}
                onClick={() => handleButtonClick(word)}
              >
                {word}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}