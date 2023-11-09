// import { BsThreeDotsVertical } from "react-icons/bs";
// import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../types/MessageTypes";
import { DocumentData } from "@firebase/firestore";

type RightHeaderProps = {
  users: { id: string; data: DocumentData }[];
  setUserInfoModalOpen: (isOpen: boolean) => void;
};

const RightHeader: React.FC<RightHeaderProps> = ({
  users,
  setUserInfoModalOpen,
}) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver
  );
  const receiverData = users.find((user) => user.id === receiver);
  console.log(receiverData);

  const openModal = () => {
    setUserInfoModalOpen(true);
  };
  console.log(users);
  return (
    <div className="col-span-8 p-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <img
            src={receiverData?.data.photo}
            alt=""
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="cursor-pointer" onClick={openModal}>
            <h2>{receiverData?.data.name}</h2>
            <p>Click here for the User Information</p>
          </div>
        </div>
        {/* <div className="space-x-4 flex items-center px-1">
          <GoSearch className="cursor-pointer" size={24}></GoSearch>
          <BsThreeDotsVertical
            className="cursor-pointer"
            size={24}
          ></BsThreeDotsVertical>
        </div> */}
      </div>
    </div>
  );
};

export default RightHeader;
