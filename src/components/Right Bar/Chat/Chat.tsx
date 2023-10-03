import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { MessageState } from "../../../types/MessageTypes";
import { useSelector } from "react-redux";

const Chat = () => {
  const messages = useSelector(
    (state: MessageState) => state.messageStore.messages || []
  );
  console.log(messages);
  const [messageData, setMessageData] = useState<string[]>(messages);

  useEffect(() => {
    setMessageData([...messages]);
  }, []);

  console.log("Messages from Redux:", messageData);
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
