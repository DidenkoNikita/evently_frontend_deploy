import { Grade } from '../icons/grade.icon';
import { ActiveGrade } from '../icons/activeGrade.icon';

import css from './GradeComponent.module.css';

interface Props {
  theme: boolean;
}

export const GradeComponent = ({ theme }: Props): JSX.Element => {
  const arr: number[] = [0, 1, 2, 3, 4];

  return (
    <div className={css.gradeWrapper}>
      {
        arr.map((index) => {
          return (
            <div
              key={index}
              className={css.grade}
            >
              {
                index === 4 ? (
                  <Grade color={theme ? '#FFFFFF' : '#000000'} />
                ) : (
                  <ActiveGrade color={theme ? '#FFFFFF' : '#000000'} />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}