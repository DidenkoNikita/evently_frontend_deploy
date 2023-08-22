import { CityInput } from '../CityInput/CityInput';
import { ButtonNext } from '../ButtonNext/ButtonNext';
import { ButtonNextRequest } from '../ButtonNextRequest/ButtonNextRequest';

import css from './Choose.module.css';

interface Words {
  header: string;
  click: boolean;
  words: string[];
  user: {} | string;
  userTheme: string;
  activeStep: number;
  openCalendar: boolean;
  activeButtons: string[];
  userData: string | { [key: string]: boolean };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveButtons: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Choose = ({
  user,
  words,
  click,
  header,
  setUser,
  userData,
  userTheme,
  activeStep,
  openCalendar,
  activeButtons,
  setActiveStep,
  setActiveButtons,
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
  };

  const handleButtonNext = (): void => {
    if (Object.keys(userData).length >= 1) {
      setActiveStep(++activeStep)
    }
  }

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
    <div>
      <div className={css.wrapper}>
        <div className={userTheme === 'dark' ? css.darkHeader : css.header}>
          {header}
        </div>
        {header === 'Сhoose a city' ? (
          <CityInput
            setCity={setUser}
            userTheme={userTheme}
            city={userData.toString()}
          />
        ) : (
          <div />
        )}
        <div className={css.buttonsWrapper}>
          {words.map((word) => (
            header === 'Сhoose a city' ? (
              <button
                key={word}
                onClick={() => handleButtonClick(word)}
                className={
                  activeButtons.includes(word) && word === userData
                    ? css.buttonActive
                    : userTheme === 'dark'
                      ? css.darkButton
                      : css.button
                }
              >
                {word}
              </button>
            ) : (
              <button
                key={word}
                onClick={() => handleButtonClick(word)}
                className={
                  activeButtons.includes(word)
                    ? css.buttonActive
                    : userTheme === 'dark'
                      ? css.darkButton
                      : css.button
                }
              >
                {word}
              </button>
            )
          ))}
        </div>
      </div>
      {
        activeStep === 6 && userData !== '' ? (
          <ButtonNextRequest
            user={user}
            click={click}
          />
        ) : (
          <ButtonNext
            activeStep={activeStep}
            handleNextStep={handleButtonNext}
            openCalendar={openCalendar}
          />
        )
      }
    </div>
  );
};
