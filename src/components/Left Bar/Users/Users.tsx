import UserCard from "./UserCard";

const Users = () => {
  const users = [
    {
      id: "user-1",
      avatar: "URL_TO_AVATAR_IMAGE_1",
      name: "John Doe",
      message: "Hello, how are you?",
      time: "12:30 PM",
    },
    {
      id: "user-2",
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
          {users.map((user) => (
            <UserCard key={user.id} name={user.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
