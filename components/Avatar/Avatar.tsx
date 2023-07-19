import { useState } from 'react';
import css from './Avatar.module.css';

interface User {
  id: number;
  phone: string;
  name: string;
  date_of_birth: string;
  gender: string;
  city: string;
  link_avatar: string
}

interface UserData {
  user: User
}

export const Avatar = ({user}: UserData): JSX.Element => {
  const [stateAwatar, setStateAwatar] = useState<boolean>(false)
  return (
    <button
      onClick={() => setStateAwatar(!stateAwatar)}
      className={stateAwatar ? css.bigAwatarWrapper : css.avatarWrapper}
    >
      <div className={stateAwatar ? css.bigAvatar : css.avatar}>
        {
          user.link_avatar === '' ? (
            <div className={stateAwatar ? css.bigAvatarData : css.avatarData}> 
              {user.name.slice(0, 1)}
            </div>
          ) : (
            <img
              src={user.link_avatar}
              alt='Avatar'
              className={stateAwatar ? css.bigImage : css.image}
            />
          )
        }
      </div>
    </button>
  )
}