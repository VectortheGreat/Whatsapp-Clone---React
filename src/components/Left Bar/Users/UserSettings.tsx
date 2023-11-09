import { useState } from "react";
import { authFBConfig, db } from "../../../config/config";
import { AiFillCloseCircle } from "react-icons/ai";
import validator from "validator";
import { toast } from "react-toastify";
import {
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "@firebase/firestore";

type UserSettingsProps = {
  setUserSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userSettingsModalOpen: boolean;
};

type UserDataUpdate = {
  name: string;
  email: string;
  password: string;
  phone: string;
  photo: string;
};

const UserSettings: React.FC<UserSettingsProps> = ({
  setUserSettingsModalOpen,
  userSettingsModalOpen,
}) => {
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

  const [dataUpdate, setDataUpdate] = useState<UserDataUpdate>({
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
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };
  console.log(dataUpdate);
  return (
    <div>
      {userSettingsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="bg-white p-4 rounded shadow-lg text-black h-screen fixed left-2 min-w-fit">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4">Settings</h2>
              <AiFillCloseCircle
                size={28}
                onClick={() => setUserSettingsModalOpen(false)}
                className="text-red-500 cursor-pointer rounded-full hover:text-red-800"
              ></AiFillCloseCircle>
            </div>
            <div className="flex space-x-10 ">
              <div>
                <img
                  src={`/src/assets/avatars/${authFBConfig.currentUser?.photoURL}.jpg`}
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />
                <p>status</p>
              </div>
              <div className="grid grid-cols-2 space-y-2">
                <p>{authFBConfig.currentUser?.displayName}</p>
                <p>{authFBConfig.currentUser?.email}</p>
                <p>{authFBConfig.currentUser?.phoneNumber} phone</p>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-blue-500 text-white py-1 px-6 rounded cursor-pointer">
                Edit
              </button>
            </div>

            <form className="mt-3 space-y-3">
              <h1 className="text-center font-bold border-b-2 border-black">
                Change Status
              </h1>
              <div className="flex items-center space-x-2">
                <label className="w-full">Status:</label>
                <input
                  type="text"
                  className="border-black border-2 rounded-lg"
                />
              </div>
              <h1 className="text-center font-bold border-b-2 border-black">
                Change Informations
              </h1>
              <div className="flex items-center space-x-2">
                <label className="w-full">Name:</label>
                <input
                  type="text"
                  className="border-black border-2 rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="name"
                  name="name"
                  value={dataUpdate.name}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-full">Email:</label>
                <input
                  type="email"
                  className="border-black border-2 rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="email"
                  name="email"
                  value={dataUpdate.email}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-full">Password:</label>
                <input
                  type="password"
                  className="border-black border-2 rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="password"
                  name="password"
                  value={dataUpdate.password}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-full">Phone:</label>
                <input
                  type="text"
                  className="border-black border-2 rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="phone"
                  name="phone"
                  value={dataUpdate.phone}
                />
              </div>
              <div className="mt-3 space-y-3">
                <h1 className="text-center font-bold border-b-2 border-black">
                  Change Avatar
                </h1>
                <div className="grid grid-cols-6 space-x-2">
                  {images.map((image, index) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt="img"
                      className={`h-20 rounded-full cursor-pointer mxx-auto p-1 ${
                        selectedImageIndex === index
                          ? "border-4 border-red-900 transform hover:scale-110 transition-transform duration-500"
                          : ""
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
              <h1 className="text-center font-bold border-b-2 border-black">
                Disable&Delete Account
              </h1>
              <div className="flex items-center space-x-1">
                <label
                  htmlFor="disableAccount"
                  className="cursor-pointer hover:text-rose-800"
                >
                  Disable:
                </label>
                <input
                  type="checkbox"
                  id="disableAccount"
                  className="cursor-pointer"
                  checked={disableChecked}
                  onChange={handleDisableChange}
                />
              </div>
              <div className="flex items-center space-x-1">
                <label
                  htmlFor="deleteAccount"
                  className="cursor-pointer hover:text-rose-800"
                >
                  Delete:
                </label>
                <input
                  type="checkbox"
                  id="deleteAccount"
                  className="cursor-pointer"
                  checked={deleteChecked}
                  onChange={handleDeleteChange}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-blue-500 text-white py-1 px-6 rounded cursor-pointer"
                  onClick={submitUpdateDatas}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
