import { ChangeEvent, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { newMessage } from "../../../redux/messageSlice";

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const onClickInput = () => {
    console.log("Değer: ", inputMessage);
    dispatch(newMessage(inputMessage));
  };

  return (
    <div className="bg-gray-200 px-4 py-2 flex items-center text-black">
      {/* <button className="text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button> */}
      <input
        type="text"
        placeholder="Type a message..."
        className="bg-transparent outline-none p-2 flex-grow"
        onChange={(e) => onChangeInput(e)}
      />
      <BiSolidSend
        size={24}
        className="text-green-500 cursor-pointer"
        onClick={onClickInput}
      ></BiSolidSend>
    </div>
  );
};

export default ChatInput;
