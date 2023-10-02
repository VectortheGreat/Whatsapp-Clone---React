import MessageCard from "./MessageCard"; // MessageCard bileşenini ekleyin

const Messages = () => {
  // Örnek mesajlar için veri oluşturun (bunu gerektiğiniz gibi güncelleyin)
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
            <MessageCard key={message.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
