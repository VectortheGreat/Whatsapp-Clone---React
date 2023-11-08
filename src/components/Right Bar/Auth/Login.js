import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authInfo, loginModeToggle, toggleLoginOrSignupReducer, tokenInfo, } from "../../../redux/userSlice";
import { authFBConfig } from "../../../config/config";
import { toast } from "react-toastify";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const auth = authFBConfig;
    const handleLogin = async () => {
        try {
            toast.info("Loading...", {
                hideProgressBar: true,
            });
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            auth.onAuthStateChanged((user) => {
                if (user) {
                    dispatch(tokenInfo(JSON.stringify(user)));
                }
                else {
                    localStorage.removeItem("user");
                }
            });
            const userPayload = {
                uid: user.uid,
                email: user.email,
            };
            dispatch(loginModeToggle(true));
            dispatch(authInfo(userPayload));
            location.reload();
        }
        catch (error) {
            console.error("Authentication failed:", error);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black", children: [_jsx("h1", { children: "Login" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-gray-600", children: "E-mail:" }), _jsx("input", { type: "email", id: "email", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500", placeholder: "Enter your E-mail", onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "password", className: "block text-gray-600", children: "Password:" }), _jsx("input", { type: "password", id: "password", className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500", placeholder: "Enter Your Password", onChange: (e) => setPassword(e.target.value) })] }), _jsxs("div", { children: [_jsx("button", { className: "w-full bg-rose-800 text-white py-2 rounded-lg hover:bg-rose-950 transition duration-300 mb-4", onClick: handleLogin, children: "Login" }), _jsx("button", { className: "w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 mb-4", onClick: () => dispatch(toggleLoginOrSignupReducer()), children: "Don't you have an Account?" })] })] }));
};
export default Login;
