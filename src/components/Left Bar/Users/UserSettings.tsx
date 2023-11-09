/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { authFBConfig, db } from "../../../config/config";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { User, updateProfile } from "firebase/auth";
import { collection, doc, updateDoc, getDoc } from "@firebase/firestore";
import { images } from "../../../utils/images";

type UserSettingsProps = {
  setUserSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userSettingsModalOpen: boolean;
};

type UserDataUpdate = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  photo?: string;
  status?: string;
  uid?: string;
};

const UserSettings: React.FC<UserSettingsProps> = ({
  setUserSettingsModalOpen,
  userSettingsModalOpen,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index: any) => {
    setSelectedImageIndex(index);
    setDataUpdate((prev) => ({
      ...prev,
      photo: images[index].url,
    }));
  };

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
    status: "",
  });
  const [fetchedDatas, setFetchedDatas] = useState<UserDataUpdate>({
    name: "",
    email: "",
    uid: "",
    photo: "",
    status: "",
  });

  const onchangeFunc = (e: any) => {
    setDataUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitUpdateDatas = async (e: any) => {
    e.preventDefault();
    try {
      const user: User | null = authFBConfig.currentUser;
      const userRef = collection(db, "users");
      // @ts-ignore
      const customDocRef = doc(userRef, authFBConfig.lastNotifiedUid);
      // if (dataUpdate.password !== "") {
      //   await updatePassword(user, dataUpdate.password);
      //   console.log("password");
      // }
      if (user !== null) {
        if (dataUpdate.name !== "") {
          await updateProfile(user, {
            displayName: dataUpdate.name,
          });
          await updateDoc(customDocRef, {
            name: dataUpdate.name,
          });
          console.log("name");
        }
        if (dataUpdate.photo !== "") {
          await updateProfile(user, {
            photoURL: dataUpdate.photo,
          });
          await updateDoc(customDocRef, {
            photo: dataUpdate.photo,
          });
          console.log("photo");
        }
        if (dataUpdate.status !== "") {
          await updateDoc(customDocRef, {
            status: dataUpdate.status,
          });
          console.log("status");
        }
        // if (dataUpdate.phone !== "") {
        //    try {
        //      const credential = await PhoneAuthProvider.credential(
        //        verificationId,
        //        verificationCode
        //      );
        //      await updatePhoneNumber(user, credential);
        //      console.log("phone");
        //    } catch (error) {
        //      console.error(error);
        //      // Handle the error, display a message, or log it as needed.
        //      // You may want to notify the user that there was an issue updating the phone number.
        //    }
        //   // try {
        //   //   await updatePhoneNumber(user, dataUpdate.phone);
        //   // } catch (error) {
        //   //   console.error(error);
        //   // }
        //   await updateDoc(customDocRef, {
        //     phone: dataUpdate.phone,
        //   });
        //   console.log("phone");
        // }
        // if (dataUpdate.email !== "") {
        //   await updateEmail(user, dataUpdate.email);
        //   await updateDoc(customDocRef, {
        //     email: dataUpdate.email,
        //   });
        //   console.log("email");
        // }
      }
      setDataUpdate({
        name: "",
        email: "",
        password: "",
        phone: "",
        photo: "",
        status: "",
      });
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };
  const fetchFromDB = async () => {
    // @ts-ignore
    const customDocRef = doc(db, "users", authFBConfig.lastNotifiedUid);
    const docSnapshot = await getDoc(customDocRef);
    const data = docSnapshot.data();
    setFetchedDatas({
      name: data?.name || "",
      email: data?.email || "",
      photo: data?.photo || "",
      status: data?.status || "",
      uid: data?.uid || "",
    });
  };
  useEffect(() => {
    fetchFromDB();
  }, [dataUpdate, userSettingsModalOpen]);

  return (
    <div>
      {userSettingsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="bg-gray-100 p-4 rounded shadow-lg text-black h-screen fixed left-2 min-w-fit overflow-y-auto">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4 px-2">Settings</h2>
              <AiFillCloseCircle
                size={28}
                onClick={() => setUserSettingsModalOpen(false)}
                className="text-red-500 cursor-pointer rounded-full hover:text-red-800"
              ></AiFillCloseCircle>
            </div>
            <div className="flex space-x-10 bg-slate-200 p-2 rounded-md text-black">
              <div>
                <img
                  src={authFBConfig.currentUser?.photoURL ?? ""}
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
              <div className="grid grid-cols-2">
                <p>{authFBConfig.currentUser?.displayName}</p>
                <p>{authFBConfig.currentUser?.email}</p>
                <p>{authFBConfig.currentUser?.phoneNumber}</p>
              </div>
            </div>
            <div className="flex flex-wrap mt-3 bg-slate-200 p-2 rounded-md text-black space-x-2">
              <h1 className="font-bold">Status:</h1>
              <p className="max-w-[400px] inline-block">
                {fetchedDatas.status}
              </p>
            </div>

            <form className="mt-3 space-y-3 bg-slate-200 p-2 rounded-md text-black">
              <h1 className="text-center font-bold border-b-2 border-black">
                Change Status
              </h1>
              <div className="flex items-center space-x-2 ">
                <label className="w-full">Status:</label>
                <input
                  type="text"
                  className="border-black border-2 rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="status"
                  name="status"
                  value={dataUpdate.status}
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
                  className=" rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="email"
                  name="email"
                  value={dataUpdate.email}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-full">Password:</label>
                <input
                  type="password"
                  className=" rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="password"
                  name="password"
                  value={dataUpdate.password}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-full">Phone:</label>
                <input
                  type="text"
                  className=" rounded-lg"
                  onChange={(e) => onchangeFunc(e)}
                  id="phone"
                  name="phone"
                  value={dataUpdate.phone}
                  disabled
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
                <label htmlFor="disableAccount">Disable:</label>
                <input
                  type="checkbox"
                  id="disableAccount"
                  checked={disableChecked}
                  onChange={handleDisableChange}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-1">
                <label htmlFor="deleteAccount">Delete:</label>
                <input
                  type="checkbox"
                  id="deleteAccount"
                  checked={deleteChecked}
                  onChange={handleDeleteChange}
                  disabled
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
