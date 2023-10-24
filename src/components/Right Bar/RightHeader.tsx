import { BsThreeDotsVertical } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../types/MessageTypes";
const RightHeader = () => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver
  );
  return (
    <div className="col-span-8 p-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <h2>User Name</h2>
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
