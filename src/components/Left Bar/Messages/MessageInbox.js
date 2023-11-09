import { jsx as _jsx } from "react/jsx-runtime";
import MessageCard from "./MessageCard";
const MessageInbox = ({ users }) => {
    const messages = [
        {
            id: "uNiqcehUHKfp2gHFQD9638TSRf63",
            avatar: "URL_TO_AVATAR_IMAGE_1",
            name: "John Doe",
            message: "Hello, how are you?",
            time: "12:30 PM",
        },
        {
            id: "zh8WqUhKKsaZxoYiTjMNMSwwbmq1",
            avatar: "URL_TO_AVATAR_IMAGE_2",
            name: "Jane Smith",
            message: "I'm good, thanks!",
            time: "1:15 PM",
        },
    ];
    // console.log(users);
    return (_jsx("div", { children: _jsx("div", { className: "border-r border-gray-300", children: _jsx("div", { className: "overflow-y-auto h-[calc(100vh-136px)]", children: messages.map((message) => (_jsx(MessageCard, { id: message.id, name: message.name }, message.id))) }) }) }));
};
export default MessageInbox;
