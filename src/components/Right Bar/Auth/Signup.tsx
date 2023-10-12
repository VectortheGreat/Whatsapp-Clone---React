import { useDispatch } from "react-redux";
import { toggleLoginOrSignupReducer } from "../../../redux/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFBConfig } from "../../../config/config";
import { useState } from "react";
import validator from "validator";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = authFBConfig;

  const handleSignup = async () => {
    try {
      const isEmailValid = validator.isEmail(email);
      if (!isEmailValid) {
        console.error("Invalid E-mail");
        toast.error("Invalid E-mail");
      } else {
        toast.info("Loading...", {
          hideProgressBar: true,
        });
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Signed up:", user);
        dispatch(toggleLoginOrSignupReducer());
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h1>Sign Up</h1>
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
          className="w-full bg-rose-800 text-white py-2 rounded-lg hover-bg-rose-950 transition duration-300 mb-4"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <button
          className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 mb-4"
          onClick={() => dispatch(toggleLoginOrSignupReducer())}
        >
          Do you have an Account?
        </button>
      </div>
    </div>
  );
};

export default Signup;
