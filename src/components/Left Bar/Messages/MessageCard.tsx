import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../../redux/messageSlice";
import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import appFBConfig, { database } from "../../../config/config";
import { loggedUserStateSelector } from "../../../types/UserTypes";
import "firebase/database";

type MessageCardProps = {
  id: number;
};

const MessageCard: React.FC<MessageCardProps> = ({ id }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(
    (state: loggedUserStateSelector) => state.userStore.loggedUser
  );

  const openChatComp = async () => {
    dispatch(openChat());
    const messageRef = ref(database, "messages");
    get(messageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            if (message.id === `${id}?${loggedUser.uid}`) {
              console.warn(true);
            } else {
              console.error(false);
            }
            console.log("Mesaj:", message.id);
          });
        } else {
          console.log("Mesaj verileri bulunamadı.");
          const messagesRef = push(messageRef);
          set(messagesRef, {
            id: `${id}?${loggedUser.uid}`,
          });
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });

    // get(messageRef)
    //   .then((snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       const message = childSnapshot.val();
    //       console.log("Mesaj:", message);
    //     });
    //     if (snapshot.exists()) {
    //       const messageData = snapshot.val();
    //       const messageArray = Object.values(messageData);
    //       console.log(messageArray);

    //       const newMessageRef = push(ref(database, `${id}?${loggedUser.uid}`));
    //       set(newMessageRef, {
    //         // id: `${id}?${loggedUser.uid}`,
    //         name: "Test Mesaj",
    //       });
    //     } else {
    //       console.log("Mesaj verileri bulunamadı.");
    //       // const messagesRef = push(messageRef);
    //       // set(messagesRef, {
    //       //   name: "All Messages",
    //       // });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Veri çekme hatası:", error);
    //   });
  };
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
