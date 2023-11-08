import { BsThreeDotsVertical } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../types/MessageTypes";
import { UsersProps } from "../../types/UserTypes";
import { useEffect } from "react";
// @ts-ignore
const RightHeader: React.FC<UsersProps> = ({ users, setUserInfoModalOpen }) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver
  );
  const foundUser = users.find((user) => user.uid === receiver);
  //console.log(foundUser);
  useEffect(() => {
    // console.log("RECEIVER: ", receiver);
    // console.log("users: ", users);
  }, [receiver, users]);

  const openModal = () => {
    setUserInfoModalOpen(true);
  };
  return (
    <div className="col-span-8 p-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <img
            src={foundUser.photo}
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="cursor-pointer" onClick={openModal}>
            <h2>{foundUser.name}</h2>
            <p>Click here for the User Information</p>
          </div>
        </div>
        <div className="space-x-4 flex items-center px-1">
          <GoSearch className="cursor-pointer" size={24}></GoSearch>
          <BsThreeDotsVertical
            className="cursor-pointer"
            size={24}
          ></BsThreeDotsVertical>
        </div>
      </div>
    </div>
  );
};

export default RightHeader;
