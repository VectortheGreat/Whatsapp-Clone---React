import { useState, useEffect, useRef } from "react";
import { BiSolidSend } from "react-icons/bi";
import ChatMessage from "./ChatMessage";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy,
} from "@firebase/firestore";
import { authFBConfig, db } from "../../../config/config";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const chatID = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatID || []
  );
  useEffect(() => {
    console.log(chatID);
    const querryMessages = query(
      messagesRef,
      where("room", "==", chatID),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(querryMessages, (snapshot) => {
      // eslint-disable-next-line prefer-const
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });
    return () => unsuscribe();
  }, [chatID]);
  const handleSubmit = async () => {
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: authFBConfig.currentUser?.displayName,
      // @ts-ignore
      userId: authFBConfig.lastNotifiedUid,
      room: chatID,
    });
    setNewMessage("");
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onKeyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col bg-gray-700">
      <div className="flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]">
        <div>
          {messages.map((message) => (
            <ChatMessage key={message.id} msg={message}></ChatMessage>
          ))}
        </div>
      </div>
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
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          ref={inputRef}
          onKeyPress={(e) => onKeyPressInput(e)}
        />
        <BiSolidSend
          size={24}
          className="text-green-500 cursor-pointer"
          onClick={handleSubmit}
        ></BiSolidSend>
      </div>
    </div>
  );
};

export default Chat;
