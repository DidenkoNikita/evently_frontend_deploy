import { CityInputSettings } from '../CityInputSettings/CityInputSettings';

import css from './Change.module.css'

interface Words {
  words: string[];
  header: string;
  color: boolean;
  user: {} | string;
  theme: boolean | null;
  activeButtons: string[];
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setActiveButtons: React.Dispatch<React.SetStateAction<string[]>>;
  setFilterCategory: React.Dispatch<React.SetStateAction<any>> | null;
}

export const Change = ({
  user,
  words,
  theme,
  color,
  header,
  setUser,
  activeButtons,
  setActiveButtons,
  setFilterCategory,
}: Words): JSX.Element => {

  const handleButtonClick = (word: string): void => {
    if (header === 'Сhoose a city') {
      setActiveButtons([word]);
      setUser(word);
    } else {
      if (activeButtons.includes(word)) {
        setActiveButtons(activeButtons.filter(button => button !== word));
      } else {
        setActiveButtons([...activeButtons, word]);
      }
      buttonClick(word);
    }

    if (header === '' && color && setFilterCategory) {
      setFilterCategory(word);
    }
  };

  const buttonClick = (word: string): void => {
    if (word === "Don't know") {
      setUser((prevStatus: any) => {
        const normalizeWord = 'do_not_know';
        const updatedStatus = { ...prevStatus };
        if (updatedStatus[normalizeWord]) {
          delete updatedStatus[normalizeWord];
        } else {
          updatedStatus[normalizeWord] = true;
        }
        return updatedStatus;
      });
    } else {
      const normalizedWord = word.replace(/\s/g, '_').toLowerCase();
      setUser((prevStatus: any) => {
        const updatedStatus = { ...prevStatus };
        if (updatedStatus[normalizedWord]) {
          delete updatedStatus[normalizedWord];
        } else {
          updatedStatus[normalizedWord] = true;
        }
        return updatedStatus;
      });
    }
  };

  return (
    <div className={color && header !== '' ? (css.colorWrapper) : css.wrapper}>
      {header === 'Сhoose a city' ? (
        <CityInputSettings
          setCity={setUser}
          city={user.toString()}
          color={color}
          theme={theme}
        />
      ) : (
        <div />
      )}
      <div className={css.buttonsWrapper}>
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleButtonClick(word)}
            className={
              activeButtons.includes(word) ? css.buttonActive : (
                color ? (
                  theme ? css.darkButton : css.colorButton
                ) : (
                  theme ? css.darkButtonSecond : css.button
                )
              )
            }
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};
