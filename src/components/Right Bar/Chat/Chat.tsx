import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { MessageStateSelector } from "../../../types/MessageTypes";
import { useSelector } from "react-redux";

const Chat = () => {
  const messages = useSelector(
    (state: MessageStateSelector) => state.messageStore.messages || []
  );
  const [messageData, setMessageData] = useState<string[]>(messages);

  useEffect(() => {
    setMessageData([...messages]);
  }, [messages]);

  // console.log("messages: ", messages);
  console.log("messageData: ", messageData);
  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        {messageData.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))}
      </div>
    </div>
  );
};
export default Chat;
