/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LeftHeader from "../components/Left Bar/LeftHeader";
import MessageInbox from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Chat from "../components/Right Bar/Chat/Chat";
import NoChat from "../components/Right Bar/Chat/NoChat";
import RightHeader from "../components/Right Bar/RightHeader";
import Users from "../components/Left Bar/Users/Users";
import Login from "../components/Right Bar/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authInfo, fetchUsersFromDB } from "../redux/userSlice";
import { UserSliceStateSelector } from "../types/UserTypes";
import { authFBConfig, database } from "../config/config";
import Signup from "../components/Right Bar/Auth/Signup";
import { MessageSliceStateSelector } from "../types/MessageTypes";
import { get, ref } from "firebase/database";
import UserInfo from "../components/Right Bar/Chat/UserInfo";
import UserSettings from "../components/Left Bar/Users/UserSettings";

const Home = () => {
  const dispatch = useDispatch();
  const [toggleMessageUserBar, setToggleMessageUserBar] =
    useState<boolean>(false);
  const loginMode = useSelector(
    (state: UserSliceStateSelector) => state.userStore.loginMode
  );
  const toggleLoginOrSignup = useSelector(
    (state: UserSliceStateSelector) => state.userStore.toggleLoginOrSignup
  );
  const openChatMode = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatMode
  );

  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);

  const auth = authFBConfig;
  const authInfoPayload = {
    app: {
      name: auth.app.name,
    },
    currentUser: auth.currentUser,
  };

  useEffect(() => {
    dispatch(authInfo(authInfoPayload));
  }, []);

  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token
  );
  useEffect(() => {}, [token]);

  const users = useSelector(
    (state: UserSliceStateSelector) => state.userStore.users
  );
  const getUsers = async () => {
    const usersRef = ref(database, "users");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const usersArray = Object.values(usersData);
          dispatch(fetchUsersFromDB(usersArray));
        } else {
          console.log("Kullanıcı verileri bulunamadı.");
        }
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  //console.log(loginMode);
  return (
    <div>
      <header className="grid grid-cols-12">
        <LeftHeader
          setToggleMessageUserBar={setToggleMessageUserBar}
          setUserSettingsModalOpen={setUserSettingsModalOpen}
        ></LeftHeader>
        {openChatMode && token && (
          <RightHeader
            setIsModalOpen={setIsModalOpen}
            users={users}
          ></RightHeader>
        )}
      </header>
      <section className="grid grid-cols-12">
        <div className="col-span-4">
          {token && <SearchInput></SearchInput>}
          {toggleMessageUserBar && token ? (
            <>
              <MessageInbox users={users}></MessageInbox>
            </>
          ) : token ? (
            <Users users={users}></Users>
          ) : (
            <span></span>
          )}
        </div>
        <div className="col-span-8">
          {!loginMode && !token ? (
            toggleLoginOrSignup ? (
              <Login></Login>
            ) : (
              <Signup></Signup>
            )
          ) : openChatMode && !loginMode ? (
            <Chat></Chat>
          ) : (
            <NoChat></NoChat>
          )}
          <UserInfo
            setUserInfoModalOpen={setUserInfoModalOpen}
            userInfoModalOpen={userInfoModalOpen}
            users={users}
          ></UserInfo>
          <UserSettings
            setUserSettingsModalOpen={setUserSettingsModalOpen}
            userSettingsModalOpen={userSettingsModalOpen}
            users={users}
          ></UserSettings>
        </div>
      </section>
    </div>
  );
};

export default Home;
