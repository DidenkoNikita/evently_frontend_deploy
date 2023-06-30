import { Apple } from "../icons/apple.icon";
import { Facebook } from "../icons/facebook.icon";
import { Google } from "../icons/google.icon";

import css from './IconButtons.module.css';

export const IconButtons = (): JSX.Element => {
  return (
    <div className={css.buttonsWraper}>
      <button className={css.iconButton}><Google /></button>
      <button className={css.iconButton}><Facebook /></button>
      <button className={css.iconButton}><Apple /></button>
    </div>
  )
}