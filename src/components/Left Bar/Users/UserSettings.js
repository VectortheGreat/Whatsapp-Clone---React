import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { authFBConfig, db } from "../../../config/config";
import { AiFillCloseCircle } from "react-icons/ai";
import validator from "validator";
import { toast } from "react-toastify";
import { updateEmail, updatePassword, updatePhoneNumber, updateProfile, } from "firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
const UserSettings = ({ setUserSettingsModalOpen, userSettingsModalOpen, }) => {
    console.log(authFBConfig.currentUser);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setDataUpdate((prev) => ({
            ...prev,
            photo: (index + 1).toString(),
        }));
    };
    const images = [
        {
            id: 1,
            url: "/src/assets/avatars/1.jpg",
        },
        {
            id: 2,
            url: "/src/assets/avatars/2.jpg",
        },
        {
            id: 3,
            url: "/src/assets/avatars/3.jpg",
        },
        {
            id: 4,
            url: "/src/assets/avatars/4.jpg",
        },
        {
            id: 5,
            url: "/src/assets/avatars/5.jpg",
        },
        {
            id: 6,
            url: "/src/assets/avatars/6.jpg",
        },
        {
            id: 7,
            url: "/src/assets/avatars/7.jpg",
        },
        {
            id: 8,
            url: "/src/assets/avatars/8.jpg",
        },
        {
            id: 9,
            url: "/src/assets/avatars/9.jpg",
        },
        {
            id: 10,
            url: "/src/assets/avatars/10.jpg",
        },
        {
            id: 11,
            url: "/src/assets/avatars/11.jpg",
        },
        {
            id: 12,
            url: "/src/assets/avatars/12.jpg",
        },
        {
            id: 13,
            url: "/src/assets/avatars/13.jpg",
        },
        {
            id: 14,
            url: "/src/assets/avatars/14.jpg",
        },
        {
            id: 15,
            url: "/src/assets/avatars/15.jpg",
        },
        {
            id: 16,
            url: "/src/assets/avatars/16.jpg",
        },
    ];
    const [disableChecked, setDisableChecked] = useState(false);
    const [deleteChecked, setDeleteChecked] = useState(false);
    const handleDisableChange = () => {
        setDisableChecked(!disableChecked);
        if (deleteChecked) {
            setDeleteChecked(false);
        }
    };
    const handleDeleteChange = () => {
        setDeleteChecked(!deleteChecked);
        if (disableChecked) {
            setDisableChecked(false);
        }
    };
    const [dataUpdate, setDataUpdate] = useState({
        name: authFBConfig.currentUser?.displayName || "",
        email: authFBConfig.currentUser?.email || "",
        password: "",
        phone: authFBConfig.currentUser?.phoneNumber || "",
        photo: "",
    });
    const onchangeFunc = (e) => {
        setDataUpdate((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const submitUpdateDatas = async (e) => {
        e.preventDefault();
        try {
            const isEmailValid = validator.isEmail(dataUpdate.email);
            //* AUTH
            const user = authFBConfig.currentUser;
            if (dataUpdate.password !== "") {
                await updatePassword(user, dataUpdate.password);
                console.log("password");
            }
            if (dataUpdate.name !== "") {
                await updateProfile(user, {
                    displayName: dataUpdate.name,
                });
                console.log("name");
            }
            if (dataUpdate.photo !== "") {
                await updateProfile(user, {
                    photoURL: dataUpdate.photo,
                });
                console.log("photo");
            }
            if (dataUpdate.phone !== "") {
                await updatePhoneNumber(user, dataUpdate.phone);
                console.log("phone");
            }
            if (dataUpdate.email !== "") {
                await updateEmail(user, dataUpdate.email);
                console.log("email");
            }
            console.log("Updated: ", user);
            const userRef = collection(db, "users");
            await addDoc(userRef, {
                email: dataUpdate.email,
                name: dataUpdate.name,
                photo: dataUpdate.photo,
                phone: dataUpdate.phone,
                uid: authFBConfig.uid,
            });
        }
        catch (error) {
            console.error("Authentication failed:", error);
            toast.error("Authentication failed: " + error);
        }
    };
    console.log(dataUpdate);
    return (_jsx("div", { children: userSettingsModalOpen && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-50 ", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-25" }), _jsxs("div", { className: "bg-white p-4 rounded shadow-lg text-black h-screen fixed left-2 min-w-fit", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h2", { className: "text-2xl mb-4", children: "Settings" }), _jsx(AiFillCloseCircle, { size: 28, onClick: () => setUserSettingsModalOpen(false), className: "text-red-500 cursor-pointer rounded-full hover:text-red-800" })] }), _jsxs("div", { className: "flex space-x-10 ", children: [_jsxs("div", { children: [_jsx("img", { src: `/src/assets/avatars/${authFBConfig.currentUser?.photoURL}.jpg`, alt: "", className: "w-12 h-12 object-cover rounded-full" }), _jsx("p", { children: "status" })] }), _jsxs("div", { className: "grid grid-cols-2 space-y-2", children: [_jsx("p", { children: authFBConfig.currentUser?.displayName }), _jsx("p", { children: authFBConfig.currentUser?.email }), _jsxs("p", { children: [authFBConfig.currentUser?.phoneNumber, " phone"] })] })] }), _jsx("div", { className: "text-center", children: _jsx("button", { className: "bg-blue-500 text-white py-1 px-6 rounded cursor-pointer", children: "Edit" }) }), _jsxs("form", { className: "mt-3 space-y-3", children: [_jsx("h1", { className: "text-center font-bold border-b-2 border-black", children: "Change Status" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-full", children: "Status:" }), _jsx("input", { type: "text", className: "border-black border-2 rounded-lg" })] }), _jsx("h1", { className: "text-center font-bold border-b-2 border-black", children: "Change Informations" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-full", children: "Name:" }), _jsx("input", { type: "text", className: "border-black border-2 rounded-lg", onChange: (e) => onchangeFunc(e), id: "name", name: "name", value: dataUpdate.name })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-full", children: "Email:" }), _jsx("input", { type: "email", className: "border-black border-2 rounded-lg", onChange: (e) => onchangeFunc(e), id: "email", name: "email", value: dataUpdate.email })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-full", children: "Password:" }), _jsx("input", { type: "password", className: "border-black border-2 rounded-lg", onChange: (e) => onchangeFunc(e), id: "password", name: "password", value: dataUpdate.password })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-full", children: "Phone:" }), _jsx("input", { type: "text", className: "border-black border-2 rounded-lg", onChange: (e) => onchangeFunc(e), id: "phone", name: "phone", value: dataUpdate.phone })] }), _jsxs("div", { className: "mt-3 space-y-3", children: [_jsx("h1", { className: "text-center font-bold border-b-2 border-black", children: "Change Avatar" }), _jsx("div", { className: "grid grid-cols-6 space-x-2", children: images.map((image, index) => (_jsx("img", { src: image.url, alt: "img", className: `h-20 rounded-full cursor-pointer mxx-auto p-1 ${selectedImageIndex === index
                                                    ? "border-4 border-red-900 transform hover:scale-110 transition-transform duration-500"
                                                    : ""}`, onClick: () => handleImageClick(index) }, image.id))) })] }), _jsx("h1", { className: "text-center font-bold border-b-2 border-black", children: "Disable&Delete Account" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("label", { htmlFor: "disableAccount", className: "cursor-pointer hover:text-rose-800", children: "Disable:" }), _jsx("input", { type: "checkbox", id: "disableAccount", className: "cursor-pointer", checked: disableChecked, onChange: handleDisableChange })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("label", { htmlFor: "deleteAccount", className: "cursor-pointer hover:text-rose-800", children: "Delete:" }), _jsx("input", { type: "checkbox", id: "deleteAccount", className: "cursor-pointer", checked: deleteChecked, onChange: handleDeleteChange })] }), _jsx("div", { className: "text-center", children: _jsx("button", { className: "bg-blue-500 text-white py-1 px-6 rounded cursor-pointer", onClick: submitUpdateDatas, children: "Save" }) })] })] })] })) }));
};
export default UserSettings;
