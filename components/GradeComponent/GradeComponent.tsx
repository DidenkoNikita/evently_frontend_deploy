import { ActiveGrade } from '../icons/activeGrade.icon';
import { Grade } from '../icons/grade.icon';
import css from './GradeComponent.module.css';

export const GradeComponent = (): JSX.Element => {
  const arr = [0, 1, 2, 3, 4];

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
                  <Grade />
                ) : (
                  <ActiveGrade />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}