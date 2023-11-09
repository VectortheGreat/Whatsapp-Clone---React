import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { newChatID } from "../../../redux/messageSlice";
import { authFBConfig } from "../../../config/config";
const UserCard = ({ id, name, photo }) => {
    const dispatch = useDispatch();
    const cardSubmit = () => {
        dispatch(newChatID([id, authFBConfig.lastNotifiedUid]));
    };
    return (_jsx("div", { children: _jsxs("div", { className: "flex p-3 border-b border-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer", onClick: cardSubmit, children: [_jsx("div", { className: "w-12 h-12 rounded-full overflow-hidden", children: _jsx("img", { src: photo, alt: "", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-semibold", children: name }), _jsx("p", { className: "text-xs text-gray-500", children: "Status" })] }), _jsx("div", { className: "ml-auto text-xs text-gray-500", children: "Date" })] }) }));
};
export default UserCard;
