import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import { database } from "../../../config/config";
import { child, get, push, ref, set, update } from "firebase/database";

type MessageValue = {
  id: number;
  content: string;
  date: string;
  hour: string;
};

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
  const [messageData, setMessageData] = useState<string[]>(messages);
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
              const value: MessageValue = messageData[0];
              if (!message.messages) {
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
                console.error("messages koleksiyonu zaten var");
                // const value = [
                //   {
                //     messageId: 2,
                //     content: "Test Mesaj",
                //     date: "23.01.2023",
                //   },
                // ];
                // const value = messageData[messageData.length - 1];
                // update(newMessageRef, {
                //   messages: [
                //     {
                //       messageId: value.id,
                //       content: value.content,
                //       date: value.date,
                //     },
                //     {
                //       messageId: value.id,
                //       content: value.content,
                //       date: value.date,
                //     },
                //   ],
                // });
                const updatedMessages = messageData.map((message, index) => {
                  if (index === 0) {
                    return {
                      messageId: value.id,
                      content: value.content,
                      date: value.date,
                      hour: value.hour,
                    };
                  }
                  return message;
                });

                update(newMessageRef, {
                  messages: updatedMessages,
                });
              }
              console.log("MessageDB: ", message.messages);
            }
          });
        } else {
          console.error("Couldn't Find Messages Collection");
        }
      })
      .catch((error) => {
        //console.error("Veri çekme hatası:", error);
      });
  };

  useEffect(() => {
    setMessageData([...messages]);
  }, [messages]);
  useEffect(() => {
    console.log("messageData: ", messageData);

    openChatComp();
  }, [messageData]);

  // console.log("messages: ", messages);
  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        {messageData.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))}
        {messageData.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))}
      </div>
      <ChatInput></ChatInput>
    </div>
  );
};
export default Chat;
