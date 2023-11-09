import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
const UserInfo = ({ setUserInfoModalOpen, userInfoModalOpen, users }) => {
    const receiver = useSelector((state) => state.messageStore.receiver);
    const receiverData = users.find((user) => user.uid === receiver);
    const closeModal = () => {
        setUserInfoModalOpen(false);
    };
    return (_jsx("div", { children: userInfoModalOpen && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-50 ", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-25", onClick: closeModal }), _jsxs("div", { className: "bg-white p-4 rounded shadow-lg text-black h-screen fixed right-2", children: [_jsxs("h2", { className: "text-2xl mb-4", children: [receiverData.name, "'s Informations"] }), _jsx("img", { src: receiverData.photo, alt: "", className: "w-12 h-12" }), _jsx("button", { onClick: closeModal, className: "bg-blue-500 text-white p-2 rounded cursor-pointer", children: "Kapat" })] })] })) }));
};
export default UserInfo;
