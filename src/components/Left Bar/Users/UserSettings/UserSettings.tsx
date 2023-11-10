/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { authFBConfig, db } from "../../../../config/config";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { User, signOut, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "@firebase/firestore";
import { images } from "../../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { loginModeToggle, tokenInfo } from "../../../../redux/userSlice";
import { UserSliceStateSelector } from "../../../../types/UserTypes";
import EmailSettings from "./Email/EmailSettings";
import PasswordSettings from "./Password/PasswordSettings";
import PhoneSettings from "./Phone/PhoneSettings";
import AvatarSettings from "./Avatar/AvatarSettings";
import DisplayNameSettings from "./DisplayName/DisplayNameSettings";
import DeleteSettings from "./Account/DeleteSettings";
import StatusSettings from "./Account/StatusSettings";
import AccountDetails from "./Account/AccountDetails";
import {
  UserDataUpdate,
  UserSettingsProps,
} from "../../../../types/UserSettingsTypes";

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

  const [deleteChecked, setDeleteChecked] = useState(false);
  // const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token
  );

  const handleDeleteChange = () => {
    setDeleteChecked(!deleteChecked);
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

  const handleLogout = () => {
    if (token) {
      signOut(authFBConfig)
        .then(() => {
          console.log("Signed out successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(tokenInfo(""));
      dispatch(loginModeToggle(false));
      authFBConfig.onAuthStateChanged((user) => {
        if (user) {
          localStorage.removeItem("user");
        }
      });
    } else {
      console.error("User is not authenticated. Cannot sign out.");
    }
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
        if (deleteChecked == true) {
          try {
            await user?.delete();
            console.log("Kullanıcı hesabı silindi.");
            await deleteDoc(customDocRef);
            console.log("Belge başarıyla silindi.");
            handleLogout();
            setUserSettingsModalOpen(false);
          } catch (error) {
            console.error("Silme hatası:", error);
          }
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
    console.log(dataUpdate);
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

            <AccountDetails fetchedDatas={fetchedDatas}></AccountDetails>
            <form className="mt-3 space-y-3 bg-slate-200 p-2 rounded-md text-black">
              <h1 className="text-center font-bold border-b-2 border-black">
                Change Status
              </h1>
              <StatusSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></StatusSettings>
              <h1 className="text-center font-bold border-b-2 border-black">
                Change Informations
              </h1>
              <DisplayNameSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></DisplayNameSettings>
              <EmailSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></EmailSettings>
              <PasswordSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></PasswordSettings>
              <PhoneSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></PhoneSettings>
              <AvatarSettings
                selectedImageIndex={selectedImageIndex}
                handleImageClick={handleImageClick}
              ></AvatarSettings>
              <h1 className="text-center font-bold border-b-2 border-black">
                Delete Account
              </h1>
              <DeleteSettings
                deleteChecked={deleteChecked}
                handleDeleteChange={handleDeleteChange}
              ></DeleteSettings>
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
      {/* {verifyEmailModal && (
        <VerifyEmailModal
          setVerifyEmailModal={setVerifyEmailModal}
          verifyEmailModal={verifyEmailModal}
        ></VerifyEmailModal>
      )} */}
    </div>
  );
};

export default UserSettings;
