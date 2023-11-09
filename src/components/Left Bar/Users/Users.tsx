/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DocumentData } from "@firebase/firestore";
import { authFBConfig } from "../../../config/config";
import UserCard from "./UserCard";

type UsersProps = {
  users?: { id: string; data: DocumentData }[];
};

const Users: React.FC<UsersProps> = ({ users }) => {
  const filteredUsers = (users ?? []).filter(
    // @ts-ignore
    (user) => user.id !== authFBConfig.lastNotifiedUid
  );

  return (
    <div>
      <div className="border-r border-gray-300">
        <div className="overflow-y-auto h-[calc(100vh-136px)]">
          <h1 className="text-center text-xl">User List</h1>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.data.uid}
              id={user.data.uid}
              name={user.data.name}
              photo={user.data.photo}
              status={user.data.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
