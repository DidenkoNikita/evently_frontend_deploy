import css from './Choose.module.css';
import { CityInput } from '../CityInput/CityInput';

interface Words {
  words: string[];
  header: string;
  user: {} | string;
  setUser: any;
  activeButtons: string[];
  setActiveButtons: any;
}

export const Choose = ({ words, header, user, setUser, activeButtons, setActiveButtons }: Words): JSX.Element => {

  const handleButtonClick = (word: string) => {
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
  };

  const buttonClick = (word: string) => {
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
    <div className={css.wrapper}>
      <div className={css.header}>{header}</div>
      {header === 'Сhoose a city' ? (
        <CityInput setCity={setUser} city={user.toString()} />
      ) : (
        <div></div>
      )}
      <div className={css.buttonsWrapper}>
        {words.map((word) => (
          <button
            key={word}
            className={activeButtons.includes(word) ? css.buttonActive : css.button}
            onClick={() => handleButtonClick(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};
