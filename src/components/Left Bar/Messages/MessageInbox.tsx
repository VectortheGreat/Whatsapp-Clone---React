import MessageCard from "./MessageCard";

const MessageInbox = () => {
  const messages = [
    {
      id: 1,
      avatar: "URL_TO_AVATAR_IMAGE_1",
      name: "John Doe",
      message: "Hello, how are you?",
      time: "12:30 PM",
    },
    {
      id: 2,
      avatar: "URL_TO_AVATAR_IMAGE_2",
      name: "Jane Smith",
      message: "I'm good, thanks!",
      time: "1:15 PM",
    },
  ];

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
