/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useDispatch } from "react-redux";
import { toggleLoginOrSignupReducer } from "../../../redux/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authFBConfig, db } from "../../../config/config";
import { SetStateAction, useState, useEffect } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { collection, doc, setDoc } from "@firebase/firestore";
import { images } from "../../../utils/images";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = authFBConfig;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [highlightImageIndex, setHighlightImageIndex] = useState(0);
  const handleImageClick = (index: SetStateAction<number>) => {
    // @ts-ignore
    setSelectedImageIndex(images[index].url);
    // @ts-ignore
    setHighlightImageIndex(images[index].id - 1);
    console.log(index);
  };
  useEffect(() => {
    handleImageClick(0);
  }, []);

  const handleSignup = async () => {
    try {
      const isEmailValid = validator.isEmail(email);
      if (!isEmailValid) {
        console.error("Invalid E-mail");
        toast.error("Invalid E-mail");
      } else if (!name) {
        console.error("Name is required");
        toast.error("Name is required");
      } else {
        //* AUTH
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
          photoURL: `${selectedImageIndex}`,
        });

        //* DATABASE
        const userRef = collection(db, "users");
        const customDocRef = doc(userRef, user.uid);
        await setDoc(customDocRef, {
          email: user.email,
          name: user.displayName,
          photo: selectedImageIndex,
          uid: user.uid,
        });
        console.log("Signed up:", user);
        dispatch(toggleLoginOrSignupReducer());
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black min-w-fit overflow-y-auto">
      <h1>Sign Up</h1>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Name:
        </label>
        <input
          type="name"
          id="name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="mb-4 flex">
        {/* {images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt="img"
            className={`h-20 rounded-full cursor-pointer ${
              selectedImageIndex === index
                ? "border-4 border-blue-500 transform hover:scale-110 transition-transform duration-500"
                : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))} */}
        <div className="grid grid-cols-6 space-x-2">
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt="img"
              className={`h-20 rounded-full cursor-pointer mxx-auto p-1 ${
                highlightImageIndex === index
                  ? "border-4 border-red-900 transform hover:scale-110 transition-transform duration-500"
                  : ""
              }`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
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
