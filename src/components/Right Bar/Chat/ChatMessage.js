import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authFBConfig } from "../../../config/config";
const ChatMessage = ({ msg }) => {
    const user = authFBConfig.lastNotifiedUid;
    if (!msg.createdAt) {
        return null;
    }
    const milliseconds = msg.createdAt.seconds * 1000 + msg.createdAt.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const hour = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (_jsx(_Fragment, { children: user === msg.userId ? (_jsx("div", { className: "mt-4 flex justify-end", children: _jsxs("div", { className: "bg-green-900 text-white p-2 rounded-md flex items-center space-x-2", children: [_jsxs("p", { children: [msg.text, " "] }), _jsx("span", { className: "text-gray-400", style: { fontSize: "0.55rem", marginTop: "10px" }, children: hour })] }) })) : (_jsx("div", { className: "mt-4 flex justify-start", children: _jsxs("div", { className: "bg-gray-800 text-white p-2 rounded-md flex items-center space-x-2", children: [_jsxs("p", { children: [msg.text, " "] }), _jsx("span", { className: "text-gray-400", style: { fontSize: "0.55rem", marginTop: "10px" }, children: hour })] }) })) }));
};
export default ChatMessage;
