import { AiFillCloseCircle } from "react-icons/ai";
const VerifyEmailModal = ({ verifyEmailModal, setVerifyEmailModal }) => {
  return (
    <div>
      {verifyEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="bg-gray-100 p-4 rounded shadow-lg text-black h-screen fixed left-2 min-w-fit overflow-y-auto">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4 px-2">Settings</h2>
              <AiFillCloseCircle
                size={28}
                onClick={() => setVerifyEmailModal(false)}
                className="text-red-500 cursor-pointer rounded-full hover:text-red-800"
              ></AiFillCloseCircle>
            </div>
            <div className="flex space-x-10 bg-slate-200 p-2 rounded-md text-black">
              test
            </div>
            <div className="flex flex-wrap mt-3 bg-slate-200 p-2 rounded-md text-black space-x-2">
              <h1 className="font-bold">Status:</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailModal;
