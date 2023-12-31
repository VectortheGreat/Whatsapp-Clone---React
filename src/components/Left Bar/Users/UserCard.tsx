/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useDispatch } from "react-redux";
import { newChatID } from "../../../redux/messageSlice";
import { authFBConfig } from "../../../config/config";

type UserCardProps = {
  name: string;
  photo: string;
  id: string;
  status: string;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, photo, status }) => {
  const dispatch = useDispatch();
  const cardSubmit = () => {
    // @ts-ignore
    dispatch(newChatID([id, authFBConfig.lastNotifiedUid]));
  };
  return (
    <div>
      <div
        className="flex p-3 border-b border-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer"
        onClick={cardSubmit}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">{status}</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">Date</div>
      </div>
    </div>
  );
};

export default UserCard;
