import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { authFBConfig } from "../../../config/config";
import UserCard from "./UserCard";
const Users = ({ users }) => {
    const filteredUsers = users.filter((user) => user.uid !== authFBConfig.lastNotifiedUid);
    console.log(users);
    return (_jsx("div", { children: _jsx("div", { className: "border-r border-gray-300", children: _jsxs("div", { className: "overflow-y-auto h-[calc(100vh-136px)]", children: [_jsx("h1", { className: "text-center text-xl", children: "User List" }), filteredUsers.map((user) => (_jsx(UserCard, { id: user.uid, name: user.name, photo: user.photo }, user.uid)))] }) }) }));
};
export default Users;
