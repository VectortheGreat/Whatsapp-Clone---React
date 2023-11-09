import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { BiSolidSend } from "react-icons/bi";
import ChatMessage from "./ChatMessage";
import { addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy, } from "@firebase/firestore";
import { authFBConfig, db } from "../../../config/config";
import { useSelector } from "react-redux";
const Chat = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");
    const chatID = useSelector((state) => state.messageStore.chatID || []);
    useEffect(() => {
        console.log(chatID);
        const querryMessages = query(messagesRef, where("room", "==", chatID), orderBy("createdAt"));
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
            userId: authFBConfig.lastNotifiedUid,
            room: chatID,
        });
        setNewMessage("");
    };
    const inputRef = useRef(null);
    const onKeyPressInput = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    return (_jsxs("div", { className: "flex flex-col bg-gray-700", children: [_jsx("div", { className: "flex-grow overflow-y-auto px-4 h-[calc(100vh-132px)]", children: _jsx("div", { children: messages.map((message) => (_jsx(ChatMessage, { msg: message }, message.id))) }) }), _jsxs("div", { className: "bg-gray-200 px-4 py-2 flex items-center text-black", children: [_jsx("input", { type: "text", placeholder: "Type a message...", className: "bg-transparent outline-none p-2 flex-grow", value: newMessage, onChange: (event) => setNewMessage(event.target.value), ref: inputRef, onKeyPress: (e) => onKeyPressInput(e) }), _jsx(BiSolidSend, { size: 24, className: "text-green-500 cursor-pointer", onClick: handleSubmit })] })] }));
};
export default Chat;
