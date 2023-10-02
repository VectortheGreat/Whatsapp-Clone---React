import { BsChatRightDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
const LeftHeader = () => {
  return (
    <div className="col-span-4 p-2">
      <div className="flex justify-between items-center px-2">
        <img
          src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
          alt=""
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="flex space-x-4">
          <BsChatRightDots
            size={24}
            className="cursor-pointer"
          ></BsChatRightDots>
          <BsThreeDotsVertical
            className="cursor-pointer"
            size={24}
          ></BsThreeDotsVertical>
        </div>
      </div>
    </div>
  );
};

export default LeftHeader;
