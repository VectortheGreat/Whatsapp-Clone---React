import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";

const UserInfo = ({ setUserInfoModalOpen, userInfoModalOpen, users }) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver
  );
  const receiverData = users.find((user) => user.uid === receiver);
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
            <h2 className="text-2xl mb-4">
              {receiverData.name}'s Informations
            </h2>
            <img src={receiverData.photo} alt="" className="w-12 h-12" />
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white p-2 rounded cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
