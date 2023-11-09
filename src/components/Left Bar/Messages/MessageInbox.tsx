import { UsersProps } from "../../../types/UserTypes";

const MessageInbox: React.FC<UsersProps> = () => {
  return (
    <div>
      <div className="border-r border-gray-300">
        <div className="overflow-y-auto h-[calc(100vh-136px)]">
          {/* {messages.map((message) => (
            <MessageCard key={message.id} id={message.id} name={message.name} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
