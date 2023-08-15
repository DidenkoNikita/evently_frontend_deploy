import { Apple } from "../icons/apple.icon";
import { Google } from "../icons/google.icon";
import { Facebook } from "../icons/facebook.icon";

import css from './IconButtons.module.css';

interface Props {
  userTheme: string;
}

export const IconButtons = ({ userTheme }: Props): JSX.Element => {
  return (
    <div className={css.buttonsWraper}>
      <button className={userTheme === 'dark' ? css.darkIconButton : css.iconButton}>
        <Google color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
      </button>
      <button className={userTheme === 'dark' ? css.darkIconButton : css.iconButton}>
        <Facebook color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
      </button>
      <button className={userTheme === 'dark' ? css.darkIconButton : css.iconButton}>
        <Apple color={userTheme === 'dark' ? '#FFFFFF' : '#000000'} />
      </button>
    </div>
  )
}