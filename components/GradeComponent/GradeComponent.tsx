import { ActiveGrade } from '../icons/activeGrade.icon';
import { Grade } from '../icons/grade.icon';
import css from './GradeComponent.module.css';

interface Props {
  theme: boolean;
}

export const GradeComponent = ({theme}: Props): JSX.Element => {
  const arr = [0, 1, 2, 3, 4];
  console.log(theme);
  
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
                  theme ? (<Grade color='#FFFFFF' />) : (<Grade color='#000000' />)
                ) : (
                  theme ? <ActiveGrade color='#FFFFFF' /> : <ActiveGrade color='#000000' />
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}