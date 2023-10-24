import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../../redux/messageSlice";
import { get, push, ref, set } from "firebase/database";
import { database } from "../../../config/config";
import { UserSliceStateSelector } from "../../../types/UserTypes";
import "firebase/database";
import { useState, useEffect } from "react";

type MessageCardProps = {
  id: number;
  name: string;
};

const MessageCard: React.FC<MessageCardProps> = ({ id, name }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(
    (state: UserSliceStateSelector) => state.userStore.loggedUser
  );
  const [chatID, setChatID] = useState<string>("");
  console.log(chatID);
  const openChatComp = async () => {
    const messageRef = ref(database, "messages");
    get(messageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let foundProduct = false;
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            // console.log("MESAJ ID: ", message.id);
            // console.log("Koşul ID: ", `${id}?${loggedUser.uid}`);
            if (
              message.id === `${id}?${loggedUser.uid}` ||
              message.id === `${loggedUser.uid}?${id}`
            ) {
              setChatID(message.id);
              foundProduct = true;
              dispatch(openChat([message.id, loggedUser]));
            }
          });
          //* Creates a new collection
          if (foundProduct === false) {
            const messagesRef = push(messageRef);
            set(messagesRef, {
              id: `${id}?${loggedUser.uid}`,
              name: `${name} and ${loggedUser.displayName} Chat`,
              messages: [{}],
            });
            console.warn("Created a new Collection");
          }
        } else {
          console.error("Couldn't Find Messages Collection");
          const messagesRef = push(messageRef);
          set(messagesRef, {
            id: `${id}?${loggedUser.uid}`,
            name: `${name} and ${loggedUser.displayName} Chat`,
            messages: [
              {
                messageId: 1,
                content: "Test Mesaj",
                date: "23.01.2023",
              },
            ],
          });
          console.warn("Created a new Collection");
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  };

  useEffect(() => {
    console.log(chatID);
  }, [chatID]);

  return (
    <div>
      <div
        className="flex p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
        onClick={openChatComp}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold">Name</p>
          <p className="text-xs text-gray-500">Message</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">Date</div>
      </div>
    </div>
  );
};

export default MessageCard;
