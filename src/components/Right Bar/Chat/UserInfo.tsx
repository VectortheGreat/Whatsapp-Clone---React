import { useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";
import { DocumentData } from "@firebase/firestore";

type UserInfoProps = {
  users: { id: string; data: DocumentData }[];
  setUserInfoModalOpen: (isOpen: boolean) => void;
  userInfoModalOpen: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({
  setUserInfoModalOpen,
  userInfoModalOpen,
  users,
}) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver
  );
  const receiverData = users.find((user) => user.id === receiver);
  const closeModal = () => {
    setUserInfoModalOpen(false);
  };

  return (
    <div>
      {userInfoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div
            className="absolute inset-0 bg-black opacity-25"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-4 rounded shadow-lg text-black h-screen fixed right-2">
            <div className="flex space-x-4">
              <div className="flex space-x-4">
                <img
                  src={receiverData?.data.photo}
                  alt=""
                  className="w-12 h-12"
                />
                <h2 className="text-2xl mb-4">{receiverData?.data.name}</h2>
              </div>
              <AiFillCloseCircle
                size={28}
                onClick={closeModal}
                className="text-red-500 cursor-pointer rounded-full hover:text-red-800"
              ></AiFillCloseCircle>
            </div>
            <div>{receiverData?.data.status}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
