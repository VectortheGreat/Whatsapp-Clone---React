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
  const user = authFBConfig.lastNotifiedUid;
  // const receiver = useSelector(
  //   (state: MessageSliceStateSelector) => state.messageStore.receiver
  // );
  // const users = useSelector(
  //   (state: UserSliceStateSelector) => state.userStore.users
  // );
  // const receiverData = users.find((user) => user.uid === receiver);
  // console.log(receiverData);
  // console.log(msg.createdAt);
  const milliseconds =
    msg.createdAt.seconds * 1000 + msg.createdAt.nanoseconds / 1000000;
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const hour = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // console.log(year);
  // console.log(month);
  // console.log(day);
  // console.log(hour);
  return (
    <>
      {user === msg.userId ? (
        <div className="mt-4 flex justify-end">
          <div className="bg-green-900 text-white p-2 rounded-md">
            <p>
              {msg.text}{" "}
              <span className="text-gray-400" style={{ fontSize: "0.55rem" }}>
                {hour}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-start">
          <div className="bg-gray-800 text-white p-2 rounded-md">
            <p>
              {msg.text}{" "}
              <span className="text-gray-400" style={{ fontSize: "0.55rem" }}>
                {hour}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
