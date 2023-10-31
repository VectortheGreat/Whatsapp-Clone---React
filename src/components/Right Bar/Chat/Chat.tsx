import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import {
  Message,
  MessageSliceStateSelector,
} from "../../../types/MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { database } from "../../../config/config";
import { get, ref, update } from "firebase/database";
import { newMessage } from "../../../redux/messageSlice";

const Chat = () => {
  const messages = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.messages || []
  );
  const chatID = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatID
  );
  const chatKey = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatKey
  );
  const dispatch = useDispatch();
  const [messageData, setMessageData] = useState<string[]>([]);
  const [messageDataBase, setMessageDataBase] = useState<string[]>([]);

  const openChatComp = async () => {
    const messageRef = ref(database, "messages");
    get(messageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            const messageKey = childSnapshot.key;
            // console.warn("MESAJ ID: ", message.id);
            // console.log("Koşul ID: ", chatID);
            if (messageKey === chatKey) {
              const messageKeyRef = `messages/${messageKey}`;
              const newMessageRef = ref(database, messageKeyRef);
              // const value: Message = messageData[0];
              const value: Message =
                messageData.length > 0 ? messageData[0] : null;

              if (!message.messages) {
                console.log(true);
                update(newMessageRef, {
                  messages: [
                    {
                      messageId: value.id,
                      content: value.content,
                      date: value.date,
                      hour: value.hour,
                    },
                  ],
                });
              } else {
                //console.error("messages koleksiyonu zaten var");
                const updatedMessages = messageData.map((message, index) => {
                  if (index === value.id) {
                    return {
                      messageId: value.id,
                      content: value.content,
                      date: value.date,
                      hour: value.hour,
                    };
                  }
                  //  console.log("Message: ", message);
                  // console.log("Index: ", index);
                  return message;
                });
                console.log(false);
                update(newMessageRef, {
                  messages: updatedMessages,
                });
              }
            }
          });
        } else {
          console.error("Couldn't Find Messages Collection");
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  };

  const getMessages = async () => {
    const messageRef = ref(database, "messages");
    get(messageRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const messageKey = childSnapshot.key;
          const message = childSnapshot.val();
          if (messageKey === chatKey) {
            setMessageDataBase(message.messages);
            //dispatch(newMessage(message.messages));
          }
        });
      }
    });
  };

  useEffect(() => {
    console.warn(messages);
    console.warn(messageDataBase);
    setMessageData([...messages]);
    setMessageDataBase([...messages]);
  }, [messages]);
  useEffect(() => {
    console.log("messageData: ", messageDataBase);
    console.log("messageDataBase: ", messageData);
    //  getMessages();
    openChatComp();
  }, [messageData]);

  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        {/* {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))} */}
        {messages?.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))}
        {/* {messageDataBase?.length > 0
          ? messageDataBase.map((msg, i) => (
              <ChatMessage key={i} msg={msg}></ChatMessage>
            ))
          : messageData.map((msg, i) => (
              <ChatMessage key={i} msg={msg}></ChatMessage>
            ))} */}
      </div>
      <ChatInput></ChatInput>
    </div>
  );
};
export default Chat;
