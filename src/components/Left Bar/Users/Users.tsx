import { authFBConfig } from "../../../config/config";
import { UsersProps } from "../../../types/UserTypes";
import UserCard from "./UserCard";

const Users: React.FC<UsersProps> = ({ users }) => {
  const filteredUsers = users.filter(
    // @ts-ignore
    (user) => user.uid !== authFBConfig.lastNotifiedUid
  );
  console.log(users);
  return (
    <div>
      <div className="border-r border-gray-300">
        <div className="overflow-y-auto h-[calc(100vh-136px)]">
          <h1 className="text-center text-xl">User List</h1>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.uid}
              id={user.uid}
              name={user.name}
              photo={user.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
