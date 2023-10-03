import { Message } from "../../../types/MessageTypes";

type ChatMessageProps = {
  msg: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ msg }) => {
  return (
    <div className="mt-4 flex justify-end">
      <div className="bg-slate-200 text-black p-2 rounded-md">
        <p>{msg.content}</p>
        <span className="text-xs text-gray-500">{msg.hour}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
