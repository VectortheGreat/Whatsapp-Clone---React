import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../../redux/messageSlice";
import { database } from "../../../config/config";
import { get, push, ref, set } from "firebase/database";
import { UserSliceStateSelector } from "../../../types/UserTypes";

type UserCardProps = {
  name: string;
  photo: string;
  id: string;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, photo }) => {
  console.log(id);
  const dispatch = useDispatch();
  const loggedUser = useSelector(
    (state: UserSliceStateSelector) => state.userStore.loggedUser
  ) || { uid: "", displayName: "", photoURL: "" };
  const openChatComp = async () => {
    const messageRef = ref(database, "messages");
    get(messageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let foundProduct = false;
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            // console.warn("MESAJ ID: ", message.id);
            // console.log("Koşul ID: ", `${id}?${loggedUser.uid}`);

            if (
              message.id === `${id}?${loggedUser.uid}` ||
              message.id === `${loggedUser.uid}?${id}`
            ) {
              const splitQuestionMark = message.id.split("?");
              // console.error(message.id);
              // console.error(`${id}?${loggedUser.uid}`);
              //setChatID(message.id);
              foundProduct = true;
              dispatch(openChat([message.id, splitQuestionMark[0]]));
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
  return (
    <div>
      <div
        className="flex p-3 border-b border-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer"
        onClick={openChatComp}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">Status</p>
        </div>
        <div className="ml-auto text-xs text-gray-500">Date</div>
      </div>
    </div>
  );
};

export default UserCard;
