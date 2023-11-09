import { UsersProps } from "../../../types/UserTypes";
import MessageCard from "./MessageCard";

const MessageInbox: React.FC<UsersProps> = ({ users }) => {
  const messages = [
    {
      id: "uNiqcehUHKfp2gHFQD9638TSRf63",
      avatar: "URL_TO_AVATAR_IMAGE_1",
      name: "John Doe",
      message: "Hello, how are you?",
      time: "12:30 PM",
    },
    {
      id: "zh8WqUhKKsaZxoYiTjMNMSwwbmq1",
      avatar: "URL_TO_AVATAR_IMAGE_2",
      name: "Jane Smith",
      message: "I'm good, thanks!",
      time: "1:15 PM",
    },
  ];
  // console.log(users);
  return (
    <div>
      <div className="border-r border-gray-300">
        <div className="overflow-y-auto h-[calc(100vh-136px)]">
          {messages.map((message) => (
            <MessageCard key={message.id} id={message.id} name={message.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageInbox;
