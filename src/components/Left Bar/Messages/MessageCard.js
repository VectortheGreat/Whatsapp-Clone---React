import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../../redux/messageSlice";
import { get, push, ref, set } from "firebase/database";
import { database } from "../../../config/config";
import "firebase/database";
import { useState, useEffect } from "react";
const MessageCard = ({ id, name }) => {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.userStore.loggedUser) || { uid: "", displayName: "", photoURL: "" };
    const [chatID, setChatID] = useState("");
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
                    if (message.id === `${id}?${loggedUser.uid}` ||
                        message.id === `${loggedUser.uid}?${id}`) {
                        const splitQuestionMark = message.id.split("?");
                        // console.error(message.id);
                        // console.error(`${id}?${loggedUser.uid}`);
                        setChatID(message.id);
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
            }
            else {
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
        // console.log(chatID);
    }, [chatID]);
    return (_jsx("div", { children: _jsxs("div", { className: "flex p-3 border-b border-gray-300 hover:bg-gray-100 cursor-pointer", onClick: cardSubmit, children: [_jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden", children: _jsx("img", { src: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740", alt: "", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-semibold", children: "Name" }), _jsx("p", { className: "text-xs text-gray-500", children: "Message" })] }), _jsx("div", { className: "ml-auto text-xs text-gray-500", children: "Date" })] }) }));
};
export default MessageCard;
