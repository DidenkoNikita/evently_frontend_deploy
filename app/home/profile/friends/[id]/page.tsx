'use client';

import i18n from "i18next";

import resources from "@/locales/resource";

import { Footer } from "@/components/Footer/Footer";
import { HeaderCategoriesOrMood } from "@/components/HeaderCategoriesOrMood/HeaderCategoriesOrMood";

import css from './page.module.css';
import { Search } from "@/components/icons/search.icon";
import { useEffect, useState } from "react";
import { store } from "@/store/store";
import { userGet } from "@/store/actions/getUser";
import { getUserList } from "@/store/actions/getUserList";
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { Friend } from "@/components/Friend/Friend";

i18n.init({
  resources,
  lng: "en"
});

export default function Friends(): JSX.Element {
  const [stateInput, setStateInput] = useState<string>('');

  useEffect(() => {
    store.dispatch(userGet());
    store.dispatch(getUserList());
  }, [])

  const user = useSelector((state: State) => state.user);

  const userList = useSelector((state: State) => state.usersList);

  const filteredFriends = userList.filter((us) =>
    us.name.toLowerCase().includes(stateInput.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <HeaderCategoriesOrMood title={i18n.t('friends')} />
      <div className={css.search}>
        <input
          className={css.input}
          placeholder={i18n.t('search2')}
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
        />
        <div className={css.icon}>
          <Search />
        </div>
      </div>
      <div className={css.wrapperFriends}>
        {
          filteredFriends.map((element, index) => {
            const checkFriend = user?.user?.friends_id.find((i) => i === element.id)
            if (checkFriend) {
              return (
                <Friend 
                  key={index}
                  data={element}
                />
              )
            }
          })
        }
      </div>
      <Footer />
    </div>
  )
}