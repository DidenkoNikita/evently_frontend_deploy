'use client';

import React, { useEffect, useRef, useState } from "react";

import i18n from "i18next";
import moment from "moment";

import { store } from "@/store/store";
import { socket } from "@/utils/socket";
import { useSelector } from "react-redux";
import resources from "@/locales/resource";
import { State } from "@/store/initialState";
import { getChatId } from "@/requests/getChatId";
import { User } from "@/store/counter/userSlice";
import { userGet } from "@/store/actions/getUser";
import { getChats } from "@/store/actions/getChats";
import { getMessages } from "@/store/actions/getMessages";
import { getUserList } from "@/store/actions/getUserList";
import { UsersList } from "@/store/counter/usersListSlice";
import { messageIsRead } from "@/store/actions/messageIsRead";
import { IMessage, markMessageAsRead } from "@/store/counter/messageSlice";

import { Message } from "@/components/Message/Message";
import { HeaderChat } from "@/components/HeaderChat/HeaderChat";
import { FooterChat } from "@/components/FooterChat/FooterChat";
import { MessagePost } from "@/components/MessagePost/MessagePost";

import css from './page.module.css';

i18n.init({
  resources,
  lng: "en"
});

export default function ChatPage() {
  const [height, setHeight] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [idUser, setIdUser] = useState<number | null>(null);
  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    store.dispatch(userGet());
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = (): void => {
    if (wrapperRef.current && wrapperRef.current.lastElementChild) {
      wrapperRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect((): void => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setIdUser(Number(userId))
  }, [])

  const id: number = Number(userId.slice(22));

  useEffect((): void => {
    getChatId({ user2Id: id }, setChatId);
  }, [id, chatId])

  useEffect((): void => {
    if (chatId !== null) {
      socket.emit('getChats', idUser);
      socket.on('chatData', (data) => {
        store.dispatch(getChats(data));
      })

      socket.emit('getMessageList', chatId);
      socket.on('messageList', (data) => {
        store.dispatch(getMessages(data))
      })

      socket.on('createMessage', (message) => {
        store.dispatch(getMessages([message]))
      })

      socket.on('messageIsRead', (message) => {
        store.dispatch(markMessageAsRead(message))
      })

      socket.on('updateChat', (chat) => {
        store.dispatch(getChats(chat))
      })
    }
  }, [chatId, idUser])

  const usersList: UsersList[] = useSelector((state: State) => state.usersList);
  const userData: UsersList | null = usersList.find((user) => user.id === id) || null;

  const messages: IMessage[] = useSelector((state: State) => state.messages);
  const filterMessage: IMessage[] = messages.filter((message) => message.chat_id === chatId);

  useEffect((): void => {
    if (wrapperRef.current) {
      const containerHeight = wrapperRef.current.clientHeight;
      setHeight(containerHeight);
    }
  }, [])

  useEffect((): void => {
    scrollToLastMessage();
  }, [messages])


  const isDifferentDate = (currentDate: moment.Moment, previousDate: moment.Moment): boolean => {
    return !currentDate.isSame(previousDate, "day");
  }

  const user: User = useSelector((state: State) => state.user);
  const theme: boolean = user?.user?.color_theme;

  return (
    <div className={theme ? css.darkChatWrapper : css.chatWrapper}>
      <HeaderChat
        theme={theme}
        name={userData?.name}
        linkAvatar={userData?.link_avatar}
        filterMessage={filterMessage}
        chatId={chatId}
      />
      <div
        className={height < 660 ? css.wrapperHowSomeMessages : css.wrapper}
        ref={wrapperRef}
      >
        {
          filterMessage.length === 0 ? (
            <div className={theme ? css.darkTitle : css.title}>
              {i18n.t('you_dont_have')}
            </div>
          ) : (
            filterMessage.map((message: IMessage, index: number) => {
              const currentDate: moment.Moment = moment(message.created_at);
              const previousDate: moment.Moment | null = index > 0 ? moment(messages[index - 1].created_at) : null;
              const isPreviousMessageDifferentUser = (index: number): boolean => {
                if (index === 0) return false;
                return filterMessage[index].user_id !== filterMessage[index - 1].user_id;
              };

              if (message.user_id !== idUser && !message.is_read) {
                store.dispatch(messageIsRead(message.id, message.user_id));
              }
              if (isPreviousMessageDifferentUser(index) && message.user_id === idUser) {
                return (
                  <div
                    key={`message-${message.id}`}
                    className={css.wrap}
                  >
                    <div className={css.spaceBetweenMessages} />
                    <Message
                      theme={theme}
                      message={message}
                    />
                  </div>
                );
              }

              if (isPreviousMessageDifferentUser(index) && message.user_id !== idUser) {
                return (
                  <div
                    key={`message-${message.id}`}
                    className={css.wrapRight}
                  >
                    <div className={css.spaceBetweenMessages} />
                    <Message
                      theme={theme}
                      message={message}
                    />
                  </div>
                );
              }

              if (message.post_id) {
                return (
                  <div
                    key={message.id}
                    className={css.postWrapper}
                  >
                    <MessagePost
                      theme={theme}
                      message={message}
                    />
                  </div>
                )
              }

              if (!previousDate || isDifferentDate(currentDate, previousDate)) {
                return (
                  <React.Fragment
                    key={`fragment-${message.id}`}
                  >
                    <div className={theme ? css.darkDate : css.date}>
                      {currentDate.format("MMMM D")}
                    </div>
                    <Message
                      theme={theme}
                      message={message}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <Message
                    theme={theme}
                    key={message.id}
                    message={message}
                  />
                );
              }
            })
          )
        }
      </div>
      <FooterChat
        id={id}
        chatId={chatId}
        theme={theme}
      />
    </div>
  )
}