import { CityInputSettings } from '../CityInputSettings/CityInputSettings';
import css from './Change.module.css'

interface Words {
  words: string[];
  header: string;
  color: boolean;
  user: {} | string;
  setUser: any;
  activeButtons: string[];
  setActiveButtons: any;
  setFilterCategory: any;
}

export const Change = ({ words, header, user, setUser, activeButtons, setActiveButtons, color, setFilterCategory }: Words): JSX.Element => {

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

    if (header === '' && color && setFilterCategory) {
      setFilterCategory(word);
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
    <div className={color && header !== '' ? css.colorWrapper : css.wrapper}>
      {header === 'Сhoose a city' ? (
        <CityInputSettings 
          setCity={setUser} 
          city={user.toString()} 
          color={color}
        />
      ) : (
        <div></div>
      )}
      <div className={css.buttonsWrapper}>
        {words.map((word) => (
          <button
            key={word}
            className={activeButtons.includes(word) ? css.buttonActive : (color ? css.colorButton : css.button)}
            onClick={() => handleButtonClick(word)}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};
