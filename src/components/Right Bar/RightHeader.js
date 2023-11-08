import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// @ts-ignore
const RightHeader = ({ users, setUserInfoModalOpen }) => {
    const receiver = useSelector((state) => state.messageStore.receiver);
    const foundUser = users.find((user) => user.uid === receiver);
    //console.log(foundUser);
    useEffect(() => {
        // console.log("RECEIVER: ", receiver);
        // console.log("users: ", users);
    }, [receiver, users]);
    const openModal = () => {
        setUserInfoModalOpen(true);
    };
    return (_jsx("div", { className: "col-span-8 p-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex space-x-3", children: [_jsx("img", { src: foundUser.photo, alt: "", className: "w-12 h-12 object-cover rounded-full" }), _jsxs("div", { className: "cursor-pointer", onClick: openModal, children: [_jsx("h2", { children: foundUser.name }), _jsx("p", { children: "Click here for the User Information" })] })] }), _jsxs("div", { className: "space-x-4 flex items-center px-1", children: [_jsx(GoSearch, { className: "cursor-pointer", size: 24 }), _jsx(BsThreeDotsVertical, { className: "cursor-pointer", size: 24 })] })] }) }));
};
export default RightHeader;
