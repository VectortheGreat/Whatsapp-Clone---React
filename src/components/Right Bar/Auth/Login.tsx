import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authInfo, loginModeToggle, tokenInfo } from "../../../redux/userSlice";
import { authFBConfig } from "../../../config/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = authFBConfig;

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      const token = "random-token-name";
      const userPayload = {
        uid: user.uid,
        email: user.email,
      };
      dispatch(tokenInfo(token));
      dispatch(loginModeToggle());
      dispatch(authInfo(userPayload));
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          className="w-full bg-rose-800 text-white py-2 rounded-lg hover:bg-rose-950 transition duration-300 mb-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
