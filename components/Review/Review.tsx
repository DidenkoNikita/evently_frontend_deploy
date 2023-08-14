import { Review } from '@/store/counter/reviewSlice';
import { ActiveGrade } from '../icons/activeGrade.icon';
import { Grade } from '../icons/grade.icon';
import css from './Review.module.css';

interface Props {
  review: Review;
  theme: boolean;
}

export const ReviewElement = ({ review, theme }: Props): JSX.Element => {

  const arr = [0, 1, 2, 3, 4];

  const time = new Date(review.created_at);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const formatMonth = (num: number) => {
    ++num;
    return num.toString().padStart(2, '0');
  }

  console.log(formatNumber(time.getDate()));


  return (
    <div className={theme ? css.darkWrapper : css.wrapper}>
      <div className={css.header}>
        <div className={css.headerData}>
          {review.link_avatar === null ? (
            <div
              className={css.fakeAvatar}
            >
              <div className={theme ? css.darkAvatarData : css.avatarData}>
                {review.name.slice(0, 1)}
              </div>
            </div>
          ) : (
            <div className={css.avatarWrapper}>
              <img
                src={review.link_avatar}
                className={css.avatar}
              />
            </div>
          )}
          <div className={css.data}>
            <div className={theme ? css.darkName : css.name}>
              {review.name}
            </div>
            <div className={theme ? css.darkDate : css.date}>
              {`${formatNumber(time.getDate())}/${formatMonth(time.getMonth())}/${formatNumber(time.getFullYear())}`}
            </div>
          </div>
        </div>
        <div className={css.gradeWrapper}>
          {
            arr.map((index) => {
              return (
                <div
                  key={index}
                  className={css.grade}
                >
                  {
                    review.grade <= index ? (
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
      </div>
      <div className={theme ? css.darkText : css.text}>
        {review.text}
      </div>
    </div>
  )
}