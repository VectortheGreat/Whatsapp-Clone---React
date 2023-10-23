import UserCard from "./UserCard";
type User = {
  uid: string;
  name: string;
  photo: string;
};

type UsersProps = {
  users: User[];
};
const Users: React.FC<UsersProps> = ({ users }) => {
  return (
    <div>
      <div className="border-r border-gray-300">
        <div className="overflow-y-auto h-[calc(100vh-136px)]">
          <h1 className="text-center text-xl">User List</h1>
          {users.map((user) => (
            <UserCard key={user.uid} name={user.name} photo={user.photo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
