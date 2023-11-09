import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { toggleLoginOrSignupReducer } from "../../../redux/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authFBConfig, database } from "../../../config/config";
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { push, ref, set } from "firebase/database";
const Signup = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const auth = authFBConfig;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };
    const images = [
        {
            id: 0,
            url: "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
        },
        {
            id: 1,
            url: "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        },
    ];
    const handleSignup = async () => {
        try {
            const isEmailValid = validator.isEmail(email);
            if (!isEmailValid) {
                console.error("Invalid E-mail");
                toast.error("Invalid E-mail");
            }
            else if (!name) {
                console.error("Name is required");
                toast.error("Name is required");
            }
            else {
                //* AUTH
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: name,
                    photoURL: images[selectedImageIndex].url,
                });
                //* DATABASE
                const usersRef = ref(database, "users");
                const newUserRef = push(usersRef);
                set(newUserRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                });
                console.log("Signed up:", user);
                dispatch(toggleLoginOrSignupReducer());
            }
        }
        catch (error) {
            console.error("Authentication failed:", error);
            toast.error("Authentication failed: " + error);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black", children: [_jsx("h1", { children: "Sign Up" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-gray-600", children: "Name:" }), _jsx("input", { type: "name", id: "name", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500", placeholder: "Enter your Name", onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-gray-600", children: "E-mail:" }), _jsx("input", { type: "email", id: "email", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500", placeholder: "Enter your E-mail", onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "block text-gray-600", children: "Password:" }), _jsx("input", { type: "password", id: "password", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500", placeholder: "Enter Your Password", onChange: (e) => setPassword(e.target.value) })] }), _jsx("div", { className: "mb-4 flex", children: images.map((image, index) => (_jsx("img", { src: image.url, alt: "img", className: `h-20 rounded-full cursor-pointer ${selectedImageIndex === index
                        ? "border-4 border-blue-500 transform hover:scale-110 transition-transform duration-500"
                        : ""}`, onClick: () => handleImageClick(index) }, image.id))) }), _jsxs("div", { children: [_jsx("button", { className: "w-full bg-rose-800 text-white py-2 rounded-lg hover-bg-rose-950 transition duration-300 mb-4", onClick: handleSignup, children: "Sign Up" }), _jsx("button", { className: "w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 mb-4", onClick: () => dispatch(toggleLoginOrSignupReducer()), children: "Do you have an Account?" })] })] }));
};
export default Signup;
