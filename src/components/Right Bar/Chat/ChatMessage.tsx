/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authFBConfig } from "../../../config/config";

type newChatMessageProps = {
  msg: {
    id?: string;
    userId?: string;
    room?: string;
    text?: string;
    user?: string;
    createdAt?: string;
  };
};

const ChatMessage: React.FC<newChatMessageProps> = ({ msg }) => {
  // @ts-ignore
  const user = authFBConfig.lastNotifiedUid;
  if (!msg.createdAt) {
    return null;
  }
  const milliseconds = // @ts-ignore
    msg.createdAt.seconds * 1000 + msg.createdAt.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  // const year = date.getFullYear();
  // const month = date.toLocaleString("default", { month: "short" });
  // const day = date.getDate();
  const hour = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      {user === msg.userId ? (
        <div className="mt-4 flex justify-end">
          <div className="bg-green-900 text-white p-2 rounded-md flex items-center space-x-2">
            <p>{msg.text} </p>
            <span
              className="text-gray-400"
              style={{ fontSize: "0.55rem", marginTop: "10px" }}
            >
              {hour}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-start">
          <div className="bg-gray-800 text-white p-2 rounded-md flex items-center space-x-2">
            <p>{msg.text} </p>
            <span
              className="text-gray-400"
              style={{ fontSize: "0.55rem", marginTop: "10px" }}
            >
              {hour}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
