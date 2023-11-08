import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signOut } from "firebase/auth";
import { BsChatRightDots } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loginModeToggle, tokenInfo } from "../../redux/userSlice";
import { authFBConfig } from "../../config/config";
import { useState } from "react";
const LeftHeader = ({ setToggleMessageUserBar, setUserSettingsModalOpen, }) => {
    const token = useSelector((state) => state.userStore.token);
    const loggedUser = useSelector((state) => state.userStore.loggedUser);
    const auth = authFBConfig;
    const dispatch = useDispatch();
    const handleLogout = () => {
        if (token) {
            signOut(auth)
                .then(() => {
                console.log("Signed out successfully");
            })
                .catch((error) => {
                console.error(error);
            });
            dispatch(tokenInfo(""));
            dispatch(loginModeToggle(false));
            auth.onAuthStateChanged((user) => {
                if (user) {
                    localStorage.removeItem("user");
                }
            });
        }
        else {
            console.error("User is not authenticated. Cannot sign out.");
        }
    };
    const [toggleThreeDots, setToggleThreeDots] = useState(false);
    const toggleThreeDotsFunc = () => {
        setToggleThreeDots(!toggleThreeDots);
    };
    return (_jsx("div", { className: "col-span-4 p-2", children: token ? (_jsxs("div", { className: "flex justify-between items-center px-2", children: [_jsxs("div", { className: "flex space-x-5", children: [_jsx("img", { src: `/src/assets/avatars/${authFBConfig.currentUser?.photoURL}.jpg`, alt: "Profile Picture", className: "w-12 h-12 object-cover rounded-full" }), _jsx("h1", { className: "mt-1", children: authFBConfig.currentUser?.displayName })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(BsChatRightDots, { size: 24, className: "cursor-pointer hover:text-rose-600", onClick: () => setToggleMessageUserBar((prevToggleMessageUserBar) => !prevToggleMessageUserBar) }), _jsxs("div", { onClick: toggleThreeDotsFunc, children: [_jsx(BsThreeDotsVertical, { className: "cursor-pointer hover:text-rose-600", size: 24 }), toggleThreeDots && (_jsx("div", { className: "bg-white rounded shadow-lg text-black absolute left-72 mt-2 ", children: _jsxs("ul", { children: [_jsx("li", { onClick: () => setUserSettingsModalOpen(true), className: "border-black border-b-2 p-2 hover:bg-slate-500 cursor-pointer", children: "Settings" }), _jsx("li", { onClick: handleLogout, className: "border-black border-b-2 p-2 hover:bg-slate-500 cursor-pointer", children: "Logout" })] }) }))] }), _jsx(GoSignOut, { className: "cursor-pointer hover:text-rose-600", size: 24, onClick: handleLogout })] })] })) : (_jsx("div", { className: "flex justify-center py-2", children: _jsx("h1", { children: "Whatsapp Clone" }) })) }));
};
export default LeftHeader;
