import ChatMessage from "./ChatMessage";

const Chat = () => {
  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        <ChatMessage></ChatMessage>
      </div>
    </div>
  );
};

export default Chat;
