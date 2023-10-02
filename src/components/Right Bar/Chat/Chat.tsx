import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { MessageState } from "../../../types/MessageTypes";

const Chat = () => {
  const [messageData, setMessageData] = useState<string[]>([]);
  const messages = useSelector((state: MessageState) => state.messages);

  console.log("Messages from Redux:", messages);

  useEffect(() => {}, []);
  useEffect(() => {
    setMessageData([...messages]);
  }, [messages]);

  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        {/* {messages.map((msg, i) => (
          <ChatMessage key={i} msg={msg}></ChatMessage>
        ))} */}
      </div>
    </div>
  );
};

export default Chat;
