'use client';

import React, { useEffect, useRef, useState } from "react";

import css from './page.module.css';
import { useSelector } from "react-redux";
import { State } from "@/store/initialState";
import { store } from "@/store/store";
import { getUserList } from "@/store/actions/getUserList";
import { HeaderChat } from "@/components/HeaderChat/HeaderChat";
import { FooterChat } from "@/components/FooterChat/FooterChat";

import i18n from "i18next";

import resources from "@/locales/resource";
import { Message } from "@/components/Message/Message";
import { getChatId } from "@/requests/getChatId";
import { socket } from "@/utils/socket";
import { getMessages } from "@/store/actions/getMessages";
import { IMessage, markMessageAsRead } from "@/store/counter/messageSlice";
import { getChats } from "@/store/actions/getChats";
import moment from "moment";
import { messageIsRead } from "@/store/actions/messageIsRead";

i18n.init({
  resources,
  lng: "en"
});

export default function ChatPage() {
  const [userId, setUserId] = useState<string>('');
  const [idUser, setIdUser] = useState<number | null>(null);

  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    setUserId(location.pathname);
    store.dispatch(getUserList());
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = () => {
    if (wrapperRef.current && wrapperRef.current.lastElementChild) {
      wrapperRef.current.lastElementChild.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    const userId = JSON.parse(sessionStorage.getItem('user_id') || '');
    setIdUser(Number(userId))
  }, [])
  
  const id: number = Number(userId.slice(22));
  console.log(id);
  
  useEffect(() => {
    getChatId({user2Id: id}, setChatId);
  }, [id, chatId])

  
  useEffect(() => {
    if (chatId !== null) {
      socket.emit('getChats', idUser);
      socket.on('chatData', (data) => {
        console.log("данные полученные с сервера", data);
        store.dispatch(getChats(data));
      });

      socket.emit('getMessageList', chatId);
      socket.on('messageList', (data) => {
        console.log("data", data);
        
        store.dispatch(getMessages(data))
      });
      socket.on('createMessage', (message) => {
        console.log("новое сообщение создано", message);
        store.dispatch(getMessages([message]))
      });

      socket.on('messageIsRead', (message) => {
        console.log("сообщение прочитано", message);
        store.dispatch(markMessageAsRead(message))
      })

      socket.on('updateChat', (chat) => {
        console.log("чат обновлён", chat );
        store.dispatch(getChats(chat))
      })
    } 
  }, [chatId])
  
  const usersList = useSelector((state : State) => state.usersList);
  
  const userData = usersList.find((user) => user.id === id) || null;
  
  const messages = useSelector((state: State) => state.messages);

  const filterMessage = messages.filter((message) => message.chat_id === chatId);
  
  console.log('messages', messages);
  
  useEffect(() => {
    scrollToLastMessage();
  }, [filterMessage]); 

  const isDifferentDate = (currentDate: moment.Moment, previousDate: moment.Moment) => {
    return !currentDate.isSame(previousDate, "day");
  };
  return (
    <div className={css.chatWrapper}>
      <HeaderChat
        name={userData?.name}
        linkAvatar={userData?.link_avatar}
        filterMessage={filterMessage}
        chatId={chatId}
      />
      <div 
        // className={messages.length <= 8 ? css.wrapperHowSomeMessages : css.wrapper} 
        className={css.wrapper}
        ref={wrapperRef}
      >
        {
          filterMessage.length === 0 ? (
            <div className={css.title}>
              {i18n.t('you_dont_have')}
            </div>
          ) : (
            filterMessage.map((message: IMessage, index: number) => {
              const currentDate = moment(message.created_at);
              const previousDate = index > 0 ? moment(messages[index - 1].created_at) : null;
              const isPreviousMessageDifferentUser = (index: number) => {
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
                    <div  className={css.spaceBetweenMessages} />
                    <Message
                      text={message.text}
                      date={message.created_at}
                      userId={message.user_id}
                      isRead={message.is_read}
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
                    <div  className={css.spaceBetweenMessages} />
                    <Message
                      text={message.text}
                      date={message.created_at}
                      userId={message.user_id}
                      isRead={message.is_read}
                    />
                  </div>
                );
              }
  
              if (!previousDate || isDifferentDate(currentDate, previousDate)) {
                return (
                  <React.Fragment key={`fragment-${message.id}`}>
                    <div className={css.date}>
                      {currentDate.format("MMMM D")}
                    </div>
                    <Message
                      key={`message-${message.id}`}
                      text={message.text}
                      date={message.created_at}
                      userId={message.user_id}
                      isRead={message.is_read}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <Message
                    key={`message-${message.id}`}
                    text={message.text}
                    date={message.created_at}
                    userId={message.user_id}
                    isRead={message.is_read}
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
      />
    </div>
  )
}